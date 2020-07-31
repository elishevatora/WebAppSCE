import { Schema, model } from "mongoose"

export const musicID={
    MUSIC:['6820654145293273090','6745419200426216197','6781056220997389061',"6826292278299085573",'6838177232985541378','6737594067640649729',"6834426930939382530","6661713183624923910"],
    current: '6624126913629653766'
}
// export const musicID={
//     MUSIC:['6624126913629653766','6745419200426216197','6781056220997389061',"6826292278299085573",'6838177232985541378','6737594067640649729',"6834426930939382530","6661713183624923910"],
//     current: '6820654145293273090'
// }

export interface ItemAPIV2 {
    id: string;
    desc: string;
    createTime: number;
    video: {
        id: string;
        height: number;
        width: number;
        duration: number;
        ratio: string;
        cover: string;
        originCover: string;
        dynamicCover: string;
        playAddr: string;
        downloadAddr: string;
        shareCover: string[];
    };
    author: {
        id: string;
        uniqueId: string;
        nickname: string;
        avatarThumb: string;
        avatarMedium: string;
        avatarLarger: string;
        signature: string;
        verified: boolean;
        secUid: string;
        relation: number;
        openFavorite: boolean;
    };
    music: {
        id: string;
        title: string;
        playUrl: string;
        coverThumb: string;
        coverMedium: string;
        coverLarge: string;
        authorName: string;
        original: boolean;
    };
    challenges: {
        id: string;
        title: string;
        desc: string;
        profileThumb: string;
        profileMedium: string;
        profileLarger: string;
        coverThumb: string;
        coverMedium: string;
        coverLarger: string;
    }[];
    stats: {
        diggCount: number;
        shareCount: number;
        commentCount: number;
        playCount: number;
    };
    originalItem: boolean;
    officalItem: boolean;
    textExtra: {
        awemeId: string;
        start: number;
        end: number;
        hashtagName: string;
        hashtagId: string;
        type: number;
        userId: string;
        isCommerce: boolean;
    }[];
    secret: boolean;
    forFriend: boolean;
    digged: boolean;
    itemCommentStatus: number;
    showNotPass: boolean;
    vl1: boolean;
}

var movieSchema = new Schema({
    id: { type: String},
    desc: { type: String},
    createTime: { type: Number},
    video:  {    },
    author:  {    },
    music:  {    },
    challenges: {    },
    stats:  {    },
    originalItem: { type: Boolean},
    officalItem: { type: Boolean},
    textExtra:  {    },
    secret: { type: Boolean},
    forFriend: { type: Boolean},
    digged: { type: Boolean},
    itemCommentStatus: { type: Number},
    showNotPass: { type: Boolean},
    vl1: { type: Boolean},
    videoUrl: { type: String},

},{strict:false})
.index({  "id":1}, { unique: true });




export let Movie = model('movie', movieSchema);
export let myMovie = model('mymovie', movieSchema);
