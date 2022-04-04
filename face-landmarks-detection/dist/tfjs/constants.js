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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LANDMARKS_REFINEMENT_RIGHT_IRIS_CONFIG = exports.LANDMARKS_REFINEMENT_LEFT_IRIS_CONFIG = exports.LANDMARKS_REFINEMENT_RIGHT_EYE_CONFIG = exports.LANDMARKS_REFINEMENT_LEFT_EYE_CONFIG = exports.LANDMARKS_REFINEMENT_LIPS_CONFIG = exports.LANDMARKS_REFINEMENT_MESH_CONFIG = exports.TENSORS_TO_LANDMARKS_IRIS_CONFIG = exports.TENSORS_TO_LANDMARKS_EYE_CONFIG = exports.TENSORS_TO_LANDMARKS_LIPS_CONFIG = exports.TENSORS_TO_LANDMARKS_MESH_CONFIG = exports.MIN_SIMILARITY_THRESHOLD = exports.FACE_PRESENCE_SCORE = exports.LANDMARK_IMAGE_TO_TENSOR_CONFIG = exports.FULL_RANGE_IMAGE_TO_TENSOR_CONFIG = exports.SHORT_RANGE_IMAGE_TO_TENSOR_CONFIG = exports.RECT_TRANSFORMATION_CONFIG = exports.DETECTOR_NON_MAX_SUPPRESSION_CONFIG = exports.FULL_RANGE_TENSORS_TO_DETECTION_CONFIG = exports.SHORT_RANGE_TENSORS_TO_DETECTION_CONFIG = exports.DEFAULT_FACE_MESH_ESTIMATION_CONFIG = exports.DEFAULT_FACE_MESH_MODEL_CONFIG = exports.DEFAULT_FACE_DETECTOR_MODEL_CONFIG = exports.FULL_RANGE_DETECTOR_ANCHOR_CONFIG = exports.SHORT_RANGE_DETECTOR_ANCHOR_CONFIG = exports.DEFAULT_LANDMARK_MODEL_URL_WITH_ATTENTION = exports.DEFAULT_LANDMARK_MODEL_URL = exports.DEFAULT_DETECTOR_MODEL_URL_SHORT = exports.DEFAULT_DETECTOR_MODEL_URL_FULL_SPARSE = exports.DEFAULT_DETECTOR_MODEL_URL_FULL = void 0;
exports.DEFAULT_DETECTOR_MODEL_URL_FULL = 'https://storage.googleapis.com/tfjs-testing/face-detection/face_detection_full_range/model.json';
exports.DEFAULT_DETECTOR_MODEL_URL_FULL_SPARSE = 'https://storage.googleapis.com/tfjs-testing/face-detection/face_detection_full_range_sparse/model.json';
exports.DEFAULT_DETECTOR_MODEL_URL_SHORT = 'https://storage.googleapis.com/tfjs-testing/face-detection/face_detection_short_range/model.json';
exports.DEFAULT_LANDMARK_MODEL_URL = 'https://storage.googleapis.com/tfjs-testing/face-detection/face_landmark/model.json';
exports.DEFAULT_LANDMARK_MODEL_URL_WITH_ATTENTION = 'https://storage.googleapis.com/tfjs-testing/face-detection/face_landmark_with_attention/model.json';
exports.SHORT_RANGE_DETECTOR_ANCHOR_CONFIG = {
    reduceBoxesInLowestLayer: false,
    interpolatedScaleAspectRatio: 1.0,
    featureMapHeight: [],
    featureMapWidth: [],
    numLayers: 4,
    minScale: 0.1484375,
    maxScale: 0.75,
    inputSizeHeight: 128,
    inputSizeWidth: 128,
    anchorOffsetX: 0.5,
    anchorOffsetY: 0.5,
    strides: [8, 16, 16, 16],
    aspectRatios: [1.0],
    fixedAnchorSize: true
};
exports.FULL_RANGE_DETECTOR_ANCHOR_CONFIG = {
    reduceBoxesInLowestLayer: false,
    interpolatedScaleAspectRatio: 0.0,
    featureMapHeight: [],
    featureMapWidth: [],
    numLayers: 1,
    minScale: 0.1484375,
    maxScale: 0.75,
    inputSizeHeight: 192,
    inputSizeWidth: 192,
    anchorOffsetX: 0.5,
    anchorOffsetY: 0.5,
    strides: [4],
    aspectRatios: [1.0],
    fixedAnchorSize: true
};
exports.DEFAULT_FACE_DETECTOR_MODEL_CONFIG = {
    modelType: 'short',
    maxFaces: 1,
    detectorModelUrl: exports.DEFAULT_DETECTOR_MODEL_URL_SHORT,
};
exports.DEFAULT_FACE_MESH_MODEL_CONFIG = {
    runtime: 'tfjs',
    maxFaces: 1,
    refineLandmarks: false,
    detectorModelUrl: exports.DEFAULT_DETECTOR_MODEL_URL_SHORT,
    landmarkModelUrl: exports.DEFAULT_LANDMARK_MODEL_URL
};
exports.DEFAULT_FACE_MESH_ESTIMATION_CONFIG = {
    flipHorizontal: false,
    staticImageMode: false
};
exports.SHORT_RANGE_TENSORS_TO_DETECTION_CONFIG = {
    applyExponentialOnBoxSize: false,
    flipVertically: false,
    ignoreClasses: [],
    numClasses: 1,
    numBoxes: 896,
    numCoords: 16,
    boxCoordOffset: 0,
    keypointCoordOffset: 4,
    numKeypoints: 6,
    numValuesPerKeypoint: 2,
    sigmoidScore: true,
    scoreClippingThresh: 100.0,
    reverseOutputOrder: true,
    xScale: 128.0,
    yScale: 128.0,
    hScale: 128.0,
    wScale: 128.0,
    minScoreThresh: 0.5
};
exports.FULL_RANGE_TENSORS_TO_DETECTION_CONFIG = {
    applyExponentialOnBoxSize: false,
    flipVertically: false,
    ignoreClasses: [],
    numClasses: 1,
    numBoxes: 2304,
    numCoords: 16,
    boxCoordOffset: 0,
    keypointCoordOffset: 4,
    numKeypoints: 6,
    numValuesPerKeypoint: 2,
    sigmoidScore: true,
    scoreClippingThresh: 100.0,
    reverseOutputOrder: true,
    xScale: 192.0,
    yScale: 192.0,
    hScale: 192.0,
    wScale: 192.0,
    minScoreThresh: 0.6
};
exports.DETECTOR_NON_MAX_SUPPRESSION_CONFIG = {
    overlapType: 'intersection-over-union',
    minSuppressionThreshold: 0.3
};
exports.RECT_TRANSFORMATION_CONFIG = {
    shiftX: 0,
    shiftY: 0,
    scaleX: 1.5,
    scaleY: 1.5,
    squareLong: true
};
exports.SHORT_RANGE_IMAGE_TO_TENSOR_CONFIG = {
    outputTensorSize: { width: 128, height: 128 },
    keepAspectRatio: true,
    outputTensorFloatRange: [-1, 1],
    borderMode: 'zero'
};
exports.FULL_RANGE_IMAGE_TO_TENSOR_CONFIG = {
    outputTensorSize: { width: 192, height: 192 },
    keepAspectRatio: true,
    outputTensorFloatRange: [-1, 1],
    borderMode: 'zero'
};
exports.LANDMARK_IMAGE_TO_TENSOR_CONFIG = {
    outputTensorSize: { width: 192, height: 192 },
    outputTensorFloatRange: [0, 1],
    borderMode: 'replicate'
};
exports.FACE_PRESENCE_SCORE = 0.5;
exports.MIN_SIMILARITY_THRESHOLD = 0.5;
exports.TENSORS_TO_LANDMARKS_MESH_CONFIG = {
    numLandmarks: 468,
    inputImageWidth: 192,
    inputImageHeight: 192,
    visibilityActivation: 'none',
    flipHorizontally: false,
    flipVertically: false
};
exports.TENSORS_TO_LANDMARKS_LIPS_CONFIG = {
    numLandmarks: 80,
    inputImageWidth: 192,
    inputImageHeight: 192,
    visibilityActivation: 'none',
    flipHorizontally: false,
    flipVertically: false
};
exports.TENSORS_TO_LANDMARKS_EYE_CONFIG = {
    numLandmarks: 71,
    inputImageWidth: 192,
    inputImageHeight: 192,
    visibilityActivation: 'none',
    flipHorizontally: false,
    flipVertically: false
};
exports.TENSORS_TO_LANDMARKS_IRIS_CONFIG = {
    numLandmarks: 5,
    inputImageWidth: 192,
    inputImageHeight: 192,
    visibilityActivation: 'none',
    flipHorizontally: false,
    flipVertically: false
};
exports.LANDMARKS_REFINEMENT_MESH_CONFIG = {
    indexesMapping: Array.from(Array(468).keys()),
    zRefinement: 'copy'
};
exports.LANDMARKS_REFINEMENT_LIPS_CONFIG = {
    indexesMapping: [
        // Lower outer.
        61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
        // Upper outer(excluding corners).
        185, 40, 39, 37, 0, 267, 269, 270, 409,
        // Lower inner.
        78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308,
        // Upper inner(excluding corners).
        191, 80, 81, 82, 13, 312, 311, 310, 415,
        // Lower semi - outer.
        76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306,
        // Upper semi - outer(excluding corners).
        184, 74, 73, 72, 11, 302, 303, 304, 408,
        // Lower semi - inner.
        62, 96, 89, 179, 86, 15, 316, 403, 319, 325, 292,
        // Upper semi - inner(excluding corners).
        183, 42, 41, 38, 12, 268, 271, 272, 407
    ],
    zRefinement: 'none'
};
exports.LANDMARKS_REFINEMENT_LEFT_EYE_CONFIG = {
    indexesMapping: [
        // Lower contour.
        33, 7, 163, 144, 145, 153, 154, 155, 133,
        // upper contour (excluding corners).
        246, 161, 160, 159, 158, 157, 173,
        // Halo x2 lower contour.
        130, 25, 110, 24, 23, 22, 26, 112, 243,
        // Halo x2 upper contour (excluding corners).
        247, 30, 29, 27, 28, 56, 190,
        // Halo x3 lower contour.
        226, 31, 228, 229, 230, 231, 232, 233, 244,
        // Halo x3 upper contour (excluding corners).
        113, 225, 224, 223, 222, 221, 189,
        // Halo x4 upper contour (no lower because of mesh structure) or
        // eyebrow inner contour.
        35, 124, 46, 53, 52, 65,
        // Halo x5 lower contour.
        143, 111, 117, 118, 119, 120, 121, 128, 245,
        // Halo x5 upper contour (excluding corners) or eyebrow outer contour.
        156, 70, 63, 105, 66, 107, 55, 193
    ],
    zRefinement: 'none'
};
exports.LANDMARKS_REFINEMENT_RIGHT_EYE_CONFIG = {
    indexesMapping: [
        // Lower contour.
        263, 249, 390, 373, 374, 380, 381, 382, 362,
        // Upper contour (excluding corners).
        466, 388, 387, 386, 385, 384, 398,
        // Halo x2 lower contour.
        359, 255, 339, 254, 253, 252, 256, 341, 463,
        // Halo x2 upper contour (excluding corners).
        467, 260, 259, 257, 258, 286, 414,
        // Halo x3 lower contour.
        446, 261, 448, 449, 450, 451, 452, 453, 464,
        // Halo x3 upper contour (excluding corners).
        342, 445, 444, 443, 442, 441, 413,
        // Halo x4 upper contour (no lower because of mesh structure) or
        // eyebrow inner contour.
        265, 353, 276, 283, 282, 295,
        // Halo x5 lower contour.
        372, 340, 346, 347, 348, 349, 350, 357, 465,
        // Halo x5 upper contour (excluding corners) or eyebrow outer contour.
        383, 300, 293, 334, 296, 336, 285, 417
    ],
    zRefinement: 'none'
};
exports.LANDMARKS_REFINEMENT_LEFT_IRIS_CONFIG = {
    indexesMapping: [
        // Center.
        468,
        // Iris right edge.
        469,
        // Iris top edge.
        470,
        // Iris left edge.
        471,
        // Iris bottom edge.
        472
    ],
    zRefinement: [
        // Lower contour.
        33, 7, 163, 144, 145, 153, 154, 155, 133,
        // Upper contour (excluding corners).
        246, 161, 160, 159, 158, 157, 173
    ]
};
exports.LANDMARKS_REFINEMENT_RIGHT_IRIS_CONFIG = {
    indexesMapping: [
        // Center.
        473,
        // Iris right edge.
        474,
        // Iris top edge.
        475,
        // Iris left edge.
        476,
        // Iris bottom edge.
        477
    ],
    zRefinement: [
        // Lower contour.
        263, 249, 390, 373, 374, 380, 381, 382, 362,
        // Upper contour (excluding corners).
        466, 388, 387, 386, 385, 384, 398
    ]
};
//# sourceMappingURL=constants.js.map