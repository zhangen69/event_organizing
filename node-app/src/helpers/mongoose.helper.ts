import mongoose from 'mongoose';

export const MongooseHelper = {
    Types: {
        String: (required = false, defaultValue = null) => {
            return {
                type: String,
                default: defaultValue,
                required,
            };
        },
        Boolean: (required = false, defaultValue = false) => {
            return {
                type: Boolean,
                default: defaultValue,
                required,
            };
        },
        Number: (defaultValue = 0.0, required = false) => {
            return {
                type: Number,
                default: defaultValue,
                required,
            };
        },
        Date: (defaultValue = Date.now, required = false) => {
            return {
                type: Date,
                default: defaultValue,
                required,
            };
        },
        Object: (defaultValue = null, required = false) => {
            return {
                type: Object,
                default: defaultValue,
                required,
            };
        },
        Enum: (enumList: string[], defaultValue = enumList[0], required = false) => {
            return {
                type: String,
                enum: enumList,
                default: defaultValue,
                required,
            };
        },
        RefObjectId: (ref: string, defaultValue = null, required = false) => {
            return {
                type: mongoose.Types.ObjectId,
                ref,
                default: defaultValue,
                required,
            };
        },
        RefObjectIds: (ref: string, defaultValue = null, required = false) => {
            return [{
                type: mongoose.Types.ObjectId,
                ref,
                default: defaultValue,
                required,
            }];
        },
        Schema: (schema: mongoose.Schema, defaultValue = null, required = false) => {
            return {
                type: schema,
                default: defaultValue,
                required,
            };
        },
        SchemaList: (schema: mongoose.Schema, defaultValue = [], required = false) => {
            return {
                type: [schema],
                default: defaultValue,
                required,
            };
        },
    },
};
