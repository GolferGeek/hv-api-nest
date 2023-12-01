// arc.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Arc, ArcDocument } from './arc.model';
import { SourceLinkService } from './sourceLink/sourceLink.service';

@Injectable()
export class ArcService {
  constructor(
    @InjectModel(Arc.name) private arcModel: Model<ArcDocument>,
    private sourceLinkService: SourceLinkService,
  ) {}

  async findAll(): Promise<Arc[]> {
    return this.arcModel.find().exec();
  }

  async findOne(id: string): Promise<Arc> {
    return this.arcModel.findById(id).exec();
  }

  async createArc(createArcDto: any): Promise<Arc> {
    const createdArc = new this.arcModel(createArcDto);
    if (createArcDto.parent) {
      this.updateArc(createArcDto.parent, {
        $push: { children: createdArc._id },
      });
    }
    if (createArcDto.source) {
      const source = await this.sourceLinkService.findOne(createArcDto.source);

      if (source) {
        this.sourceLinkService.updateSourceLink(createArcDto.source, {
          $push: { arcs: createdArc._id },
        });
      }
    }
    return createdArc.save();
  }

  async updateArc(id: string, updateArcDto: any): Promise<Arc> {
    return this.arcModel
      .findByIdAndUpdate(id, updateArcDto, { new: true })
      .exec();
  }
}
