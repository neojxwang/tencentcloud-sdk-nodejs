/*
 * Copyright (c) 2018 THL A29 Limited, a Tencent company. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const AbstractModel = require("../../common/abstract_model");

/**
 * FaceFusion返回参数结构体
 * @class
 */
class FaceFusionResponse extends  AbstractModel {
    constructor(){
        super();

        /**
         * RspImgType 为 url 时，返回结果的 url， RspImgType 为 base64 时返回 base64 数据。当前仅支持 url 方式，base64 方式后期开放。
         * @type {string || null}
         */
        this.Image = null;

        /**
         * 鉴政结果
         * @type {Array.<FuseFaceReviewResult> || null}
         */
        this.ReviewResultSet = null;

        /**
         * 唯一请求 ID，每次请求都会返回。定位问题时需要提供该次请求的 RequestId。
         * @type {string || null}
         */
        this.RequestId = null;

    }

    /**
     * @private
     */
    deserialize(params) {
        if (!params) {
            return;
        }
        this.Image = 'Image' in params ? params.Image : null;

        if (params.ReviewResultSet) {
            this.ReviewResultSet = new Array();
            for (let z in params.ReviewResultSet) {
                let obj = new FuseFaceReviewResult();
                obj.deserialize(params.ReviewResultSet[z]);
                this.ReviewResultSet.push(obj);
            }
        }
        this.RequestId = 'RequestId' in params ? params.RequestId : null;

    }
}

/**
 * FaceFusion请求参数结构体
 * @class
 */
class FaceFusionRequest extends  AbstractModel {
    constructor(){
        super();

        /**
         * 活动 ID，请在人脸融合控制台查看。
         * @type {string || null}
         */
        this.ProjectId = null;

        /**
         * 素材 ID，请在人脸融合控制台查看。
         * @type {string || null}
         */
        this.ModelId = null;

        /**
         * 图片 base64 数据。请确保人脸为正脸，无旋转。若某些手机拍摄后人脸被旋转，请使用图片的 EXIF 信息对图片进行旋转处理；请勿在 base64 数据中包含头部，如“data:image/jpeg;base64,”。
         * @type {string || null}
         */
        this.Image = null;

        /**
         * 返回图像方式（url 或 base64) ，二选一。当前仅支持 url 方式，base64 方式后期开放。
         * @type {string || null}
         */
        this.RspImgType = null;

        /**
         * 0表示不需要鉴黄，1表示需要鉴黄。2018年12月1号以前创建的活动默认值为0，其他情况默认值为1.
         * @type {number || null}
         */
        this.PornDetect = null;

        /**
         * 0表示不需要鉴政，1表示需要鉴政。2018年12月1号以前创建的活动默认值为0，其他情况默认值为1。鉴政接口同时会对名人明星进行识别，您可以根据实际需要过滤。
         * @type {number || null}
         */
        this.CelebrityIdentify = null;

    }

    /**
     * @private
     */
    deserialize(params) {
        if (!params) {
            return;
        }
        this.ProjectId = 'ProjectId' in params ? params.ProjectId : null;
        this.ModelId = 'ModelId' in params ? params.ModelId : null;
        this.Image = 'Image' in params ? params.Image : null;
        this.RspImgType = 'RspImgType' in params ? params.RspImgType : null;
        this.PornDetect = 'PornDetect' in params ? params.PornDetect : null;
        this.CelebrityIdentify = 'CelebrityIdentify' in params ? params.CelebrityIdentify : null;

    }
}

/**
 * 人脸融合鉴黄鉴政人脸信息
 * @class
 */
class FuseFaceReviewDetail extends  AbstractModel {
    constructor(){
        super();

        /**
         * 鉴政使用字段, 为职业属性,其他审核结果对应上一级category
         * @type {string || null}
         */
        this.Field = null;

        /**
         * 人员名称
         * @type {string || null}
         */
        this.Label = null;

        /**
         * 对应识别label的置信度
         * @type {number || null}
         */
        this.Confidence = null;

        /**
         * 此字段为保留字段，目前统一返回pass。
         * @type {string || null}
         */
        this.Suggestion = null;

    }

    /**
     * @private
     */
    deserialize(params) {
        if (!params) {
            return;
        }
        this.Field = 'Field' in params ? params.Field : null;
        this.Label = 'Label' in params ? params.Label : null;
        this.Confidence = 'Confidence' in params ? params.Confidence : null;
        this.Suggestion = 'Suggestion' in params ? params.Suggestion : null;

    }
}

/**
 * 人脸图片和待被融合的素材模板图的人脸位置信息。
 * @class
 */
class MergeInfo extends  AbstractModel {
    constructor(){
        super();

        /**
         * 输入图片base64
         * @type {string || null}
         */
        this.Image = null;

        /**
         * 输入图片url
         * @type {string || null}
         */
        this.Url = null;

        /**
         * 上传的图片人脸位置信息（人脸框）
         * @type {FaceRect || null}
         */
        this.InputImageFaceRect = null;

        /**
         * 控制台上传的素材人脸ID
         * @type {string || null}
         */
        this.TemplateFaceID = null;

    }

    /**
     * @private
     */
    deserialize(params) {
        if (!params) {
            return;
        }
        this.Image = 'Image' in params ? params.Image : null;
        this.Url = 'Url' in params ? params.Url : null;

        if (params.InputImageFaceRect) {
            let obj = new FaceRect();
            obj.deserialize(params.InputImageFaceRect)
            this.InputImageFaceRect = obj;
        }
        this.TemplateFaceID = 'TemplateFaceID' in params ? params.TemplateFaceID : null;

    }
}

/**
 * 人脸融合鉴黄鉴政返回参数item
 * @class
 */
class FuseFaceReviewResult extends  AbstractModel {
    constructor(){
        super();

        /**
         * 对应的类别名称 porn, politics, terror
         * @type {string || null}
         */
        this.Category = null;

        /**
         * 对应子类别状态码
         * @type {string || null}
         */
        this.Code = null;

        /**
         * 对应子类别状态码信息描述
         * @type {string || null}
         */
        this.CodeDescription = null;

        /**
         * 对应识别种类的置信度
         * @type {number || null}
         */
        this.Confidence = null;

        /**
         * 此字段为保留字段，目前统一返回pass。
         * @type {string || null}
         */
        this.Suggestion = null;

        /**
         * 审核详细内容
         * @type {Array.<FuseFaceReviewDetail> || null}
         */
        this.DetailSet = null;

    }

    /**
     * @private
     */
    deserialize(params) {
        if (!params) {
            return;
        }
        this.Category = 'Category' in params ? params.Category : null;
        this.Code = 'Code' in params ? params.Code : null;
        this.CodeDescription = 'CodeDescription' in params ? params.CodeDescription : null;
        this.Confidence = 'Confidence' in params ? params.Confidence : null;
        this.Suggestion = 'Suggestion' in params ? params.Suggestion : null;

        if (params.DetailSet) {
            this.DetailSet = new Array();
            for (let z in params.DetailSet) {
                let obj = new FuseFaceReviewDetail();
                obj.deserialize(params.DetailSet[z]);
                this.DetailSet.push(obj);
            }
        }

    }
}

/**
 * FuseFace返回参数结构体
 * @class
 */
class FuseFaceResponse extends  AbstractModel {
    constructor(){
        super();

        /**
         * RspImgType 为 url 时，返回结果的 url， RspImgType 为 base64 时返回 base64 数据。
         * @type {string || null}
         */
        this.FusedImage = null;

        /**
         * 唯一请求 ID，每次请求都会返回。定位问题时需要提供该次请求的 RequestId。
         * @type {string || null}
         */
        this.RequestId = null;

    }

    /**
     * @private
     */
    deserialize(params) {
        if (!params) {
            return;
        }
        this.FusedImage = 'FusedImage' in params ? params.FusedImage : null;
        this.RequestId = 'RequestId' in params ? params.RequestId : null;

    }
}

/**
 * FuseFace请求参数结构体
 * @class
 */
class FuseFaceRequest extends  AbstractModel {
    constructor(){
        super();

        /**
         * 活动 ID，请在人脸融合控制台查看。
         * @type {string || null}
         */
        this.ProjectId = null;

        /**
         * 素材 ID，请在人脸融合控制台查看。
         * @type {string || null}
         */
        this.ModelId = null;

        /**
         * 返回图像方式（url 或 base64) ，二选一。url有效期为30天。
         * @type {string || null}
         */
        this.RspImgType = null;

        /**
         * 用户人脸图片、素材模板图的人脸位置信息。
         * @type {Array.<MergeInfo> || null}
         */
        this.MergeInfos = null;

        /**
         * 脸型融合比例，数值越高，融合后的脸型越像素材人物。取值范围[0,100] 
若此参数不填写，则使用人脸融合控制台中脸型参数数值。
         * @type {number || null}
         */
        this.FuseProfileDegree = null;

        /**
         * 五官融合比例，数值越高，融合后的五官越像素材人物。取值范围[0,100] 
若此参数不填写，则使用人脸融合控制台中五官参数数值。
         * @type {number || null}
         */
        this.FuseFaceDegree = null;

    }

    /**
     * @private
     */
    deserialize(params) {
        if (!params) {
            return;
        }
        this.ProjectId = 'ProjectId' in params ? params.ProjectId : null;
        this.ModelId = 'ModelId' in params ? params.ModelId : null;
        this.RspImgType = 'RspImgType' in params ? params.RspImgType : null;

        if (params.MergeInfos) {
            this.MergeInfos = new Array();
            for (let z in params.MergeInfos) {
                let obj = new MergeInfo();
                obj.deserialize(params.MergeInfos[z]);
                this.MergeInfos.push(obj);
            }
        }
        this.FuseProfileDegree = 'FuseProfileDegree' in params ? params.FuseProfileDegree : null;
        this.FuseFaceDegree = 'FuseFaceDegree' in params ? params.FuseFaceDegree : null;

    }
}

/**
 * 人脸框信息
 * @class
 */
class FaceRect extends  AbstractModel {
    constructor(){
        super();

        /**
         * 人脸框左上角横坐标。
         * @type {number || null}
         */
        this.X = null;

        /**
         * 人脸框左上角纵坐标。
         * @type {number || null}
         */
        this.Y = null;

        /**
         * 人脸框宽度。
         * @type {number || null}
         */
        this.Width = null;

        /**
         * 人脸框高度。
         * @type {number || null}
         */
        this.Height = null;

    }

    /**
     * @private
     */
    deserialize(params) {
        if (!params) {
            return;
        }
        this.X = 'X' in params ? params.X : null;
        this.Y = 'Y' in params ? params.Y : null;
        this.Width = 'Width' in params ? params.Width : null;
        this.Height = 'Height' in params ? params.Height : null;

    }
}

module.exports = {
    FaceFusionResponse: FaceFusionResponse,
    FaceFusionRequest: FaceFusionRequest,
    FuseFaceReviewDetail: FuseFaceReviewDetail,
    MergeInfo: MergeInfo,
    FuseFaceReviewResult: FuseFaceReviewResult,
    FuseFaceResponse: FuseFaceResponse,
    FuseFaceRequest: FuseFaceRequest,
    FaceRect: FaceRect,

}
