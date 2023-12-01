// refutation.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Refutation, RefutationDocument } from './refutation.model';

@Injectable()
export class RefutationService {
  constructor(
    @InjectModel(Refutation.name)
    private refutationModel: Model<RefutationDocument>,
  ) {}

  async findAll(): Promise<Refutation[]> {
    return this.refutationModel.find().exec();
  }

  async findOne(id: string): Promise<Refutation> {
    return this.refutationModel.findById(id).exec();
  }

  async createRefutation(createRefutationDto: any): Promise<Refutation> {
    const createdRefutation = new this.refutationModel(createRefutationDto);
    if (createRefutationDto.parent) {
      this.updateRefutation(createRefutationDto.parent, {
        $push: { children: createdRefutation._id },
      });
    }
    return createdRefutation.save();
  }

  async updateRefutation(
    id: string,
    updateRefutationDto: any,
  ): Promise<Refutation> {
    return this.refutationModel
      .findByIdAndUpdate(id, updateRefutationDto, { new: true })
      .exec();
  }
}
