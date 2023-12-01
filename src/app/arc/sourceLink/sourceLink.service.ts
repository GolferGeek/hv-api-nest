// sourceLink.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SourceLink, SourceLinkDocument } from './sourceLink.model';

@Injectable()
export class SourceLinkService {
  constructor(
    @InjectModel(SourceLink.name)
    private sourceLinkModel: Model<SourceLinkDocument>,
  ) {}

  async findAll(): Promise<SourceLink[]> {
    return this.sourceLinkModel.find().exec();
  }

  async findOne(id: string): Promise<SourceLink> {
    return this.sourceLinkModel.findById(id).exec();
  }

  async createSourceLink(createSourceLinkDto: any): Promise<SourceLink> {
    const createdSourceLink = new this.sourceLinkModel(createSourceLinkDto);
    return createdSourceLink.save();
  }

  async updateSourceLink(
    id: string,
    updateSourceLinkDto: any,
  ): Promise<SourceLink> {
    return this.sourceLinkModel
      .findByIdAndUpdate(id, updateSourceLinkDto, { new: true })
      .exec();
  }
}
