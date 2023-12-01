// comment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comment.model';
import { ArcService } from '../arc.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private arcService: ArcService,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async findOne(id: string): Promise<Comment> {
    return this.commentModel.findById(id).exec();
  }

  async createComment(createCommentDto: any): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto);
    if (createdComment.parent) {
      this.updateComment(createCommentDto.parent, {
        $push: { children: createdComment._id },
      });
    }
    return createdComment.save();
  }

  async updateComment(id: string, updateCommentDto: any): Promise<Comment> {
    return this.commentModel
      .findByIdAndUpdate(id, updateCommentDto, { new: true })
      .exec();
  }
}
