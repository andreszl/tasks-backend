import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

@Schema()
export class Task {
    @Prop({
        required: true,
        unique: true,
        type: String,
    })
    _id: ObjectId = new ObjectId();

    @Prop({
        required: true,
        unique: false,
        type: String,
    })
    email: string = '';

    @Prop({
        required: false,
        type: String,
    })
    title: string ='';

    @Prop({
        required: false,
        type: String,
    })
    description: string = '';

    @Prop({
        required: false,
        type: String,
    })
    status: string = 'false';
}

export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task).set('versionKey', false);
