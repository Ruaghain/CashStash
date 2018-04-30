import {ICategory} from "./category";
import {Schema, Document, Model, model} from "mongoose";

export interface ICategoryModel extends ICategory, Document {

}

export let CategorySchema: Schema = new Schema({
  name: String,
  _parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  _children: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }]
});

CategorySchema.path('name').validate((value: any, respond: any) => {
  return Category.findOne({name: value}).exec()
    .then((category: any) => {
      if (category) {
        if (this.id === category.id) {
          return respond(true);
        }
        return respond(false);
      }
    }).catch((err: any) => {
      throw err;
    })
}, 'The specified category name is already in use.'
);

export const Category: Model<ICategoryModel> = model<ICategoryModel>('Category', CategorySchema);
