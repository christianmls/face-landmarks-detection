"use strict";
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMeshModel = exports.loadDetectorModel = void 0;
var tfconv = require("@tensorflow/tfjs-converter");
var tf = require("@tensorflow/tfjs-core");
var constants_1 = require("../constants");
var association_norm_rect_1 = require("../shared/calculators/association_norm_rect");
var calculate_landmark_projection_1 = require("../shared/calculators/calculate_landmark_projection");
var convert_image_to_tensor_1 = require("../shared/calculators/convert_image_to_tensor");
var create_ssd_anchors_1 = require("../shared/calculators/create_ssd_anchors");
var detection_projection_1 = require("../shared/calculators/detection_projection");
var detection_to_rect_1 = require("../shared/calculators/detection_to_rect");
var detector_result_1 = require("../shared/calculators/detector_result");
var image_utils_1 = require("../shared/calculators/image_utils");
var landmarks_refinement_1 = require("../shared/calculators/landmarks_refinement");
var landmarks_to_detection_1 = require("../shared/calculators/landmarks_to_detection");
var non_max_suppression_1 = require("../shared/calculators/non_max_suppression");
var normalized_keypoints_to_keypoints_1 = require("../shared/calculators/normalized_keypoints_to_keypoints");
var tensors_to_detections_1 = require("../shared/calculators/tensors_to_detections");
var tensors_to_landmarks_1 = require("../shared/calculators/tensors_to_landmarks");
var transform_rect_1 = require("../shared/calculators/transform_rect");
var constants = require("./constants");
var detector_utils_1 = require("./detector_utils");
var MediaPipeFaceDetectorTfjs = /** @class */ (function () {
    function MediaPipeFaceDetectorTfjs(detectorModelType, detectorModel, maxFaces) {
        this.detectorModel = detectorModel;
        this.maxFaces = maxFaces;
        if (detectorModelType === 'full') {
            this.imageToTensorConfig = constants.FULL_RANGE_IMAGE_TO_TENSOR_CONFIG;
            this.tensorsToDetectionConfig =
                constants.FULL_RANGE_TENSORS_TO_DETECTION_CONFIG;
            this.anchors =
                create_ssd_anchors_1.createSsdAnchors(constants.FULL_RANGE_DETECTOR_ANCHOR_CONFIG);
        }
        else {
            this.imageToTensorConfig = constants.SHORT_RANGE_IMAGE_TO_TENSOR_CONFIG;
            this.tensorsToDetectionConfig =
                constants.SHORT_RANGE_TENSORS_TO_DETECTION_CONFIG;
            this.anchors =
                create_ssd_anchors_1.createSsdAnchors(constants.SHORT_RANGE_DETECTOR_ANCHOR_CONFIG);
        }
        var anchorW = tf.tensor1d(this.anchors.map(function (a) { return a.width; }));
        var anchorH = tf.tensor1d(this.anchors.map(function (a) { return a.height; }));
        var anchorX = tf.tensor1d(this.anchors.map(function (a) { return a.xCenter; }));
        var anchorY = tf.tensor1d(this.anchors.map(function (a) { return a.yCenter; }));
        this.anchorTensor = { x: anchorX, y: anchorY, w: anchorW, h: anchorH };
    }
    MediaPipeFaceDetectorTfjs.prototype.dispose = function () {
        this.detectorModel.dispose();
        tf.dispose([
            this.anchorTensor.x, this.anchorTensor.y, this.anchorTensor.w,
            this.anchorTensor.h
        ]);
    };
    MediaPipeFaceDetectorTfjs.prototype.reset = function () { };
    // Detects faces.
    // Subgraph: FaceDetectionShort/FullRangeCpu.
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/face_detection/face_detection_short_range_cpu.pbtxt
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/face_detection/face_detection_full_range_cpu.pbtxt
    MediaPipeFaceDetectorTfjs.prototype.detectFaces = function (image, flipHorizontal) {
        if (flipHorizontal === void 0) { flipHorizontal = false; }
        return __awaiter(this, void 0, void 0, function () {
            var image3d, _a, inputTensors, transformMatrix, detectionResult, _b, boxes, logits, unfilteredDetections, filteredDetections, detections;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (image == null) {
                            this.reset();
                            return [2 /*return*/, []];
                        }
                        image3d = tf.tidy(function () {
                            var imageTensor = tf.cast(image_utils_1.toImageTensor(image), 'float32');
                            if (flipHorizontal) {
                                var batchAxis = 0;
                                imageTensor = tf.squeeze(tf.image.flipLeftRight(
                                // tslint:disable-next-line: no-unnecessary-type-assertion
                                tf.expandDims(imageTensor, batchAxis)), [batchAxis]);
                            }
                            return imageTensor;
                        });
                        _a = convert_image_to_tensor_1.convertImageToTensor(image3d, this.imageToTensorConfig), inputTensors = _a.imageTensor, transformMatrix = _a.transformationMatrix;
                        detectionResult = this.detectorModel.execute(inputTensors, 'Identity:0');
                        _b = detector_result_1.detectorResult(detectionResult), boxes = _b.boxes, logits = _b.logits;
                        return [4 /*yield*/, tensors_to_detections_1.tensorsToDetections([logits, boxes], this.anchorTensor, this.tensorsToDetectionConfig)];
                    case 1:
                        unfilteredDetections = _c.sent();
                        if (unfilteredDetections.length === 0) {
                            tf.dispose([image3d, inputTensors, detectionResult, logits, boxes]);
                            return [2 /*return*/, unfilteredDetections];
                        }
                        return [4 /*yield*/, non_max_suppression_1.nonMaxSuppression(unfilteredDetections, this.maxFaces, constants.DETECTOR_NON_MAX_SUPPRESSION_CONFIG.minSuppressionThreshold, constants.DETECTOR_NON_MAX_SUPPRESSION_CONFIG.overlapType)];
                    case 2:
                        filteredDetections = _c.sent();
                        detections = 
                        // FaceDetectionShortRangeModelCpu:
                        // DetectionProjectionCalculator
                        detection_projection_1.detectionProjection(filteredDetections, transformMatrix);
                        tf.dispose([image3d, inputTensors, detectionResult, logits, boxes]);
                        return [2 /*return*/, detections];
                }
            });
        });
    };
    return MediaPipeFaceDetectorTfjs;
}());
/**
 * Loads the MediaPipeFaceDetector model.
 *
 * @param modelConfig ModelConfig object that contains parameters for
 * the MediaPipeFaceDetector loading process. Please find more details of each
 * parameters in the documentation of the `MediaPipeHandsTfjsModelConfig`
 * interface.
 */
function loadDetectorModel(modelConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var config, detectorFromTFHub, detectorModel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = detector_utils_1.validateDetectorModelConfig(modelConfig);
                    detectorFromTFHub = typeof config.detectorModelUrl === 'string' &&
                        (config.detectorModelUrl.indexOf('https://tfhub.dev') > -1);
                    return [4 /*yield*/, tfconv.loadGraphModel(config.detectorModelUrl, { fromTFHub: detectorFromTFHub })];
                case 1:
                    detectorModel = _a.sent();
                    return [2 /*return*/, new MediaPipeFaceDetectorTfjs(config.modelType, detectorModel, config.maxFaces)];
            }
        });
    });
}
exports.loadDetectorModel = loadDetectorModel;
/**
 * MediaPipFaceMesh class.
 */
var MediaPipeFaceMeshTfjsLandmarksDetector = /** @class */ (function () {
    function MediaPipeFaceMeshTfjsLandmarksDetector(detector, landmarkModel, maxFaces, withAttention) {
        this.detector = detector;
        this.landmarkModel = landmarkModel;
        this.maxFaces = maxFaces;
        this.withAttention = withAttention;
        // Store global states.
        this.prevFaceRectsFromLandmarks = null;
    }
    /**
     * Estimates faces for an image or video frame.
     *
     * It returns a single face or multiple faces based on the maxFaces
     * parameter from the `config`.
     *
     * @param image
     * ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement The input
     * image to feed through the network.
     *
     * @param estimationConfig Optional. See
     *     `MediaPipeFaceMeshTfjsEstimationConfig` documentation for detail.
     *
     * @return An array of `Face`s.
     */
    // TF.js implementation of the mediapipe face landmark pipeline.
    // ref graph:
    // https://github.com/google/mediapipe/blob/master/mediapipe/mediapipe/modules/face_landmark/face_landmark_front_cpu.pbtxt
    MediaPipeFaceMeshTfjsLandmarksDetector.prototype.estimateFaces = function (image, estimationConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var config, imageSize, image3d, prevFaceRectsFromLandmarks, faceRectsFromDetections, allFaceDetections, faceDetections, faceRects, faceLandmarks, faces, i, landmarks, keypoints, detection;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = detector_utils_1.validateEstimationConfig(estimationConfig);
                        if (image == null) {
                            this.reset();
                            return [2 /*return*/, []];
                        }
                        imageSize = image_utils_1.getImageSize(image);
                        image3d = tf.tidy(function () {
                            var imageTensor = tf.cast(image_utils_1.toImageTensor(image), 'float32');
                            if (config.flipHorizontal) {
                                var batchAxis = 0;
                                imageTensor = tf.squeeze(tf.image.flipLeftRight(
                                // tslint:disable-next-line: no-unnecessary-type-assertion
                                tf.expandDims(imageTensor, batchAxis)), [batchAxis]);
                            }
                            return imageTensor;
                        });
                        prevFaceRectsFromLandmarks = this.prevFaceRectsFromLandmarks;
                        if (!(config.staticImageMode || prevFaceRectsFromLandmarks == null ||
                            prevFaceRectsFromLandmarks.length < this.maxFaces)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.detector.detectFaces(image3d)];
                    case 1:
                        allFaceDetections = _a.sent();
                        if (allFaceDetections.length === 0) {
                            this.reset();
                            image3d.dispose();
                            return [2 /*return*/, []];
                        }
                        faceDetections = allFaceDetections;
                        // FaceLandmarkFrontCpu: FaceDetectionFrontDetectionToRoi
                        // Calculates region of interest based on face detections, so that can be
                        // used to detect landmarks.
                        faceRectsFromDetections = faceDetections.map(function (detection) {
                            return _this.faceDetectionFrontDetectionToRoi(detection, imageSize);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        faceRectsFromDetections = [];
                        _a.label = 3;
                    case 3:
                        faceRects = association_norm_rect_1.calculateAssociationNormRect([faceRectsFromDetections, prevFaceRectsFromLandmarks || []], constants.MIN_SIMILARITY_THRESHOLD);
                        return [4 /*yield*/, Promise.all(faceRects.map(function (faceRect) { return _this.faceLandmark(faceRect, image3d); }))];
                    case 4:
                        faceLandmarks = _a.sent();
                        faces = [];
                        this.prevFaceRectsFromLandmarks = [];
                        for (i = 0; i < faceLandmarks.length; ++i) {
                            landmarks = faceLandmarks[i];
                            if (landmarks == null) {
                                continue;
                            }
                            this.prevFaceRectsFromLandmarks.push(this.faceLandmarksToRoi(landmarks, imageSize));
                            keypoints = normalized_keypoints_to_keypoints_1.normalizedKeypointsToKeypoints(landmarks, imageSize);
                            // Add keypoint name.
                            if (keypoints != null) {
                                keypoints.forEach(function (keypoint, i) {
                                    var name = constants_1.MEDIAPIPE_KEYPOINTS.get(i);
                                    if (name != null) {
                                        keypoint.name = name;
                                    }
                                });
                            }
                            detection = landmarks_to_detection_1.landmarksToDetection(keypoints);
                            faces.push({ keypoints: keypoints, box: detection.locationData.relativeBoundingBox });
                        }
                        image3d.dispose();
                        return [2 /*return*/, faces];
                }
            });
        });
    };
    MediaPipeFaceMeshTfjsLandmarksDetector.prototype.dispose = function () {
        this.detector.dispose();
        this.landmarkModel.dispose();
    };
    MediaPipeFaceMeshTfjsLandmarksDetector.prototype.reset = function () {
        this.detector.reset();
        this.prevFaceRectsFromLandmarks = null;
    };
    // calculates face ROI from face detection.
    // Subgraph: FaceDetectionFrontDetectionToRoi.
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/face_landmark/face_detection_front_detection_to_roi.pbtxt
    MediaPipeFaceMeshTfjsLandmarksDetector.prototype.faceDetectionFrontDetectionToRoi = function (detection, imageSize) {
        // Converts results of face detection into a rectangle (normalized by
        // image size) that encloses the face and is rotated such that the line
        // connecting left eye and right eye is aligned with the X-axis of the
        // rectangle.
        // FaceDetectionFrontDetectionToRoi: DetectionsToRectsCalculator.
        var rawRoi = detection_to_rect_1.calculateDetectionsToRects(detection, 'boundingbox', 'normRect', imageSize, {
            rotationVectorStartKeypointIndex: 0,
            rotationVectorEndKeypointIndex: 1,
            rotationVectorTargetAngleDegree: 0
        });
        // Expands and shifts the rectangle that contains the face so that it's
        // likely to cover the entire face.
        // FaceDetectionFrontDetectionToRoi: RectTransformationCalculation.
        var roi = transform_rect_1.transformNormalizedRect(rawRoi, imageSize, constants.RECT_TRANSFORMATION_CONFIG);
        return roi;
    };
    // Predict face landmarks.
    // subgraph: FaceLandmarkCpu
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/face_landmark/face_landmark_cpu.pbtxt
    MediaPipeFaceMeshTfjsLandmarksDetector.prototype.faceLandmark = function (roi, image) {
        return __awaiter(this, void 0, void 0, function () {
            var inputTensors, outputs, outputTensors, faceFlagTensor, landmarkTensors, facePresenceScore, landmarks, _a, faceLandmarks;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        inputTensors = convert_image_to_tensor_1.convertImageToTensor(image, constants.LANDMARK_IMAGE_TO_TENSOR_CONFIG, roi).imageTensor;
                        outputs = ['output_faceflag'].concat(this.withAttention ?
                            [
                                'output_mesh_identity', 'output_lips', 'Identity_6:0',
                                'Identity_1:0', 'Identity_2:0', 'Identity_5:0'
                            ] :
                            ['output_mesh']);
                        outputTensors = this.landmarkModel.execute(inputTensors, outputs);
                        faceFlagTensor = outputTensors[0], landmarkTensors = outputTensors.slice(1);
                        return [4 /*yield*/, faceFlagTensor.data()];
                    case 1:
                        facePresenceScore = (_b.sent())[0];
                        // Applies a threshold to the confidence score to determine whether a face
                        // is present.
                        if (facePresenceScore < constants.FACE_PRESENCE_SCORE) {
                            tf.dispose(outputTensors);
                            tf.dispose(inputTensors);
                            return [2 /*return*/, null];
                        }
                        if (!this.withAttention) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.tensorsToFaceLandmarksWithAttention(landmarkTensors)];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.tensorsToFaceLandmarks(landmarkTensors)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        landmarks = _a;
                        faceLandmarks = calculate_landmark_projection_1.calculateLandmarkProjection(landmarks, roi);
                        tf.dispose(outputTensors);
                        tf.dispose(inputTensors);
                        return [2 /*return*/, faceLandmarks];
                }
            });
        });
    };
    // Transform single tensor into 468 facial landmarks.
    // subgraph: TensorsToFaceLandmarks
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/face_landmark/tensors_to_face_landmarks.pbtxt
    MediaPipeFaceMeshTfjsLandmarksDetector.prototype.tensorsToFaceLandmarks = function (landmarkTensors) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, tensors_to_landmarks_1.tensorsToLandmarks(landmarkTensors[0], constants.TENSORS_TO_LANDMARKS_MESH_CONFIG)];
            });
        });
    };
    // Transform model output tensors into 478 facial landmarks with refined
    // lips, eyes and irises.
    // subgraph: TensorsToFaceLandmarks
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/face_landmark/tensors_to_face_landmarks_with_attention.pbtxt
    MediaPipeFaceMeshTfjsLandmarksDetector.prototype.tensorsToFaceLandmarksWithAttention = function (landmarkTensors) {
        return __awaiter(this, void 0, void 0, function () {
            var meshLandmarks, lipsLandmarks, leftEyeLandmarks, rightEyeLandmarks, leftIrisLandmarks, rightIrisLandmarks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tensors_to_landmarks_1.tensorsToLandmarks(landmarkTensors[0], constants.TENSORS_TO_LANDMARKS_MESH_CONFIG)];
                    case 1:
                        meshLandmarks = _a.sent();
                        return [4 /*yield*/, tensors_to_landmarks_1.tensorsToLandmarks(landmarkTensors[1], constants.TENSORS_TO_LANDMARKS_LIPS_CONFIG)];
                    case 2:
                        lipsLandmarks = _a.sent();
                        return [4 /*yield*/, tensors_to_landmarks_1.tensorsToLandmarks(landmarkTensors[3], constants.TENSORS_TO_LANDMARKS_EYE_CONFIG)];
                    case 3:
                        leftEyeLandmarks = _a.sent();
                        return [4 /*yield*/, tensors_to_landmarks_1.tensorsToLandmarks(landmarkTensors[5], constants.TENSORS_TO_LANDMARKS_EYE_CONFIG)];
                    case 4:
                        rightEyeLandmarks = _a.sent();
                        return [4 /*yield*/, tensors_to_landmarks_1.tensorsToLandmarks(landmarkTensors[4], constants.TENSORS_TO_LANDMARKS_IRIS_CONFIG)];
                    case 5:
                        leftIrisLandmarks = _a.sent();
                        return [4 /*yield*/, tensors_to_landmarks_1.tensorsToLandmarks(landmarkTensors[2], constants.TENSORS_TO_LANDMARKS_IRIS_CONFIG)];
                    case 6:
                        rightIrisLandmarks = _a.sent();
                        return [2 /*return*/, landmarks_refinement_1.landmarksRefinement([
                                meshLandmarks, lipsLandmarks, leftEyeLandmarks, rightEyeLandmarks,
                                leftIrisLandmarks, rightIrisLandmarks
                            ], [
                                constants.LANDMARKS_REFINEMENT_MESH_CONFIG,
                                constants.LANDMARKS_REFINEMENT_LIPS_CONFIG,
                                constants.LANDMARKS_REFINEMENT_LEFT_EYE_CONFIG,
                                constants.LANDMARKS_REFINEMENT_RIGHT_EYE_CONFIG,
                                constants.LANDMARKS_REFINEMENT_LEFT_IRIS_CONFIG,
                                constants.LANDMARKS_REFINEMENT_RIGHT_IRIS_CONFIG
                            ])];
                }
            });
        });
    };
    // Calculate face region of interest (ROI) from detections.
    // subgraph: FaceLandmarkLandmarksToRoi
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/face_landmark/face_landmark_landmarks_to_roi.pbtxt
    MediaPipeFaceMeshTfjsLandmarksDetector.prototype.faceLandmarksToRoi = function (landmarks, imageSize) {
        // Converts face landmarks to a detection that tightly encloses all
        // landmarks.
        // FaceLandmarkLandmarksToRoi: LandmarksToDetectionCalculator.
        var faceDetection = landmarks_to_detection_1.landmarksToDetection(landmarks);
        // Converts the face detection into a rectangle (normalized by image size)
        // that encloses the face and is rotated such that the line connecting
        // left side of the left eye and right side of the right eye is aligned
        // with the X-axis of the rectangle.
        // FaceLandmarkLandmarksToRoi: DetectionsToRectsCalculator
        var faceRectFromLandmarks = detection_to_rect_1.calculateDetectionsToRects(faceDetection, 'boundingbox', 'normRect', imageSize, {
            rotationVectorStartKeypointIndex: 33,
            rotationVectorEndKeypointIndex: 263,
            rotationVectorTargetAngleDegree: 0
        });
        // Expands the face rectangle so that in the next video image it's likely
        // to still contain the face even with some motion.
        // FaceLandmarkLandmarksToRoi: RectTransformationCalculator.
        // TODO: `squareLong` in the config should be set to false in MediaPipe code
        // but is not due to a bug in their processing. Once fixed on their end,
        // split RECT_TRANSFORMATION_CONFIG into separate detector and landmark
        // configs, with landmark's config's `squareLong` set to false.
        var roi = transform_rect_1.transformNormalizedRect(faceRectFromLandmarks, imageSize, constants.RECT_TRANSFORMATION_CONFIG);
        return roi;
    };
    return MediaPipeFaceMeshTfjsLandmarksDetector;
}());
/**
 * Loads the MediaPipeFaceMesh model.
 *
 * @param modelConfig ModelConfig object that contains parameters for
 * the MediaPipeFaceMesh loading process. Please find more details of each
 * parameters in the documentation of the `MediaPipeHandsTfjsModelConfig`
 * interface.
 */
function loadMeshModel(modelConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var config, landmarkFromTFHub, landmarkModel, detector;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = detector_utils_1.validateMeshModelConfig(modelConfig);
                    landmarkFromTFHub = typeof config.landmarkModelUrl === 'string' &&
                        (config.landmarkModelUrl.indexOf('https://tfhub.dev') > -1);
                    return [4 /*yield*/, tfconv.loadGraphModel(config.landmarkModelUrl, { fromTFHub: landmarkFromTFHub })];
                case 1:
                    landmarkModel = _a.sent();
                    return [4 /*yield*/, loadDetectorModel({
                            modelType: 'short',
                            maxFaces: config.maxFaces,
                            detectorModelUrl: config.detectorModelUrl
                        })];
                case 2:
                    detector = _a.sent();
                    return [2 /*return*/, new MediaPipeFaceMeshTfjsLandmarksDetector(detector, landmarkModel, config.maxFaces, config.refineLandmarks)];
            }
        });
    });
}
exports.loadMeshModel = loadMeshModel;
//# sourceMappingURL=detector.js.map