import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CommentService } from './comment/comment.service';
import { ArcService } from './arc.service';
import { RefutationService } from './refutation/refutation.service';
import { SourceLinkService } from './sourceLink/sourceLink.service';
import { InjectModel } from '@nestjs/mongoose';
import { Arc, ArcDocument } from './arc.model';
import { Refutation, RefutationDocument } from './refutation/refutation.model';
import { CommentDocument, Comment } from './comment/comment.model';
import { SourceLink, SourceLinkDocument } from './sourceLink/sourceLink.model';

@Injectable()
export class DeleteService {
  constructor(
    private arcService: ArcService,
    private sourceLinkService: SourceLinkService,
    private refutationService: RefutationService,
    private commentService: CommentService,
    @InjectModel(Arc.name) private arcModel: Model<ArcDocument>,
    @InjectModel(Refutation.name)
    private refutationModel: Model<RefutationDocument>,
    @InjectModel(Comment.name)
    private commentModel: Model<CommentDocument>,
    @InjectModel(SourceLink.name)
    private sourceLinkModel: Model<SourceLinkDocument>,
  ) {}

  async deleteArc(_id: string) {
    const arc = await this.arcService.findOne(_id);
    if (arc) {
      if (arc.parent) {
        this.arcService.updateArc(arc.parent.toString(), {
          $pull: { children: _id },
        });
      }
      arc.comments.forEach((comment) => {
        this.deleteComment(comment.toString());
      });
      arc.refutations.forEach((refutation) => {
        this.deleteRefutation(refutation.toString());
      });
      if (arc.source) {
        const source = await this.sourceLinkService.findOne(
          arc.source.toString(),
        );
        if (source) {
          this.sourceLinkService.updateSourceLink(source._id.toString(), {
            $pull: { arcs: arc._id },
          });
        }
      }
      arc.children.forEach((child) => {
        this.deleteArc(child.toString());
      });
      await this.arcModel.findByIdAndDelete(_id).exec();
    }
  }

  async deleteRefutation(_id: string): Promise<void> {
    const refutation = await this.refutationModel.findById(_id).exec();
    if (refutation.parent) {
      this.refutationService.updateRefutation(refutation.parent.toString(), {
        $pull: { children: _id },
      });
    }
    refutation.children.forEach((child) => {
      this.deleteRefutation(child.toString());
    });
    refutation.comments.forEach((comment) => {
      this.deleteComment(comment.toString());
    });

    this.arcService.updateArc(refutation.arc.toString(), {
      $pull: { refutations: _id },
    });

    const source = await this.sourceLinkService.findOne(
      refutation.source.toString(),
    );
    if (source) {
      this.sourceLinkService.updateSourceLink(refutation.source.toString(), {
        $pull: { refutations: _id },
      });
    }

    await this.refutationModel.findByIdAndDelete(_id).exec();
  }

  async deleteComment(_id: string): Promise<void> {
    const comment = await this.commentModel.findById(_id).exec();

    comment.children.forEach((child) => {
      this.deleteComment(child.toString());
    });

    if (comment.parent) {
      this.commentService.updateComment(comment.parent.toString(), {
        $pull: { children: _id },
      });
    }

    this.arcService.updateArc(comment.arc.toString(), {
      $pull: { comments: _id },
    });

    await this.commentModel.findByIdAndDelete(_id).exec();
  }

  async deleteSourceLink(id: string): Promise<void> {
    const sourceLink = await this.sourceLinkModel.findById(id).exec();
    if (sourceLink) {
      sourceLink.arcs.forEach((arc) => {
        this.deleteArc(arc.toString());
      });
      sourceLink.refutations.forEach((refutation) => {
        this.deleteRefutation(refutation.toString());
      });
      await this.sourceLinkModel.findByIdAndDelete(id).exec();
    }
  }
}
