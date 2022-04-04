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
import { AnchorConfig, ImageToTensorConfig, LandmarksRefinementConfig, RectTransformationConfig, TensorsToDetectionsConfig, TensorsToLandmarksConfig } from '../shared/calculators/interfaces/config_interfaces';
import { MediaPipeFaceDetectorTfjsModelConfig, MediaPipeFaceMeshTfjsEstimationConfig, MediaPipeFaceMeshTfjsModelConfig } from './types';
export declare const DEFAULT_DETECTOR_MODEL_URL_FULL = "https://storage.googleapis.com/tfjs-testing/face-detection/face_detection_full_range/model.json";
export declare const DEFAULT_DETECTOR_MODEL_URL_FULL_SPARSE = "https://storage.googleapis.com/tfjs-testing/face-detection/face_detection_full_range_sparse/model.json";
export declare const DEFAULT_DETECTOR_MODEL_URL_SHORT = "https://storage.googleapis.com/tfjs-testing/face-detection/face_detection_short_range/model.json";
export declare const DEFAULT_LANDMARK_MODEL_URL = "https://storage.googleapis.com/tfjs-testing/face-detection/face_landmark/model.json";
export declare const DEFAULT_LANDMARK_MODEL_URL_WITH_ATTENTION = "https://storage.googleapis.com/tfjs-testing/face-detection/face_landmark_with_attention/model.json";
export declare const SHORT_RANGE_DETECTOR_ANCHOR_CONFIG: AnchorConfig;
export declare const FULL_RANGE_DETECTOR_ANCHOR_CONFIG: AnchorConfig;
export declare const DEFAULT_FACE_DETECTOR_MODEL_CONFIG: MediaPipeFaceDetectorTfjsModelConfig;
export declare const DEFAULT_FACE_MESH_MODEL_CONFIG: MediaPipeFaceMeshTfjsModelConfig;
export declare const DEFAULT_FACE_MESH_ESTIMATION_CONFIG: MediaPipeFaceMeshTfjsEstimationConfig;
export declare const SHORT_RANGE_TENSORS_TO_DETECTION_CONFIG: TensorsToDetectionsConfig;
export declare const FULL_RANGE_TENSORS_TO_DETECTION_CONFIG: TensorsToDetectionsConfig;
export declare const DETECTOR_NON_MAX_SUPPRESSION_CONFIG: {
    overlapType: "intersection-over-union";
    minSuppressionThreshold: number;
};
export declare const RECT_TRANSFORMATION_CONFIG: RectTransformationConfig;
export declare const SHORT_RANGE_IMAGE_TO_TENSOR_CONFIG: ImageToTensorConfig;
export declare const FULL_RANGE_IMAGE_TO_TENSOR_CONFIG: ImageToTensorConfig;
export declare const LANDMARK_IMAGE_TO_TENSOR_CONFIG: ImageToTensorConfig;
export declare const FACE_PRESENCE_SCORE = 0.5;
export declare const MIN_SIMILARITY_THRESHOLD = 0.5;
export declare const TENSORS_TO_LANDMARKS_MESH_CONFIG: TensorsToLandmarksConfig;
export declare const TENSORS_TO_LANDMARKS_LIPS_CONFIG: TensorsToLandmarksConfig;
export declare const TENSORS_TO_LANDMARKS_EYE_CONFIG: TensorsToLandmarksConfig;
export declare const TENSORS_TO_LANDMARKS_IRIS_CONFIG: TensorsToLandmarksConfig;
export declare const LANDMARKS_REFINEMENT_MESH_CONFIG: LandmarksRefinementConfig;
export declare const LANDMARKS_REFINEMENT_LIPS_CONFIG: LandmarksRefinementConfig;
export declare const LANDMARKS_REFINEMENT_LEFT_EYE_CONFIG: LandmarksRefinementConfig;
export declare const LANDMARKS_REFINEMENT_RIGHT_EYE_CONFIG: LandmarksRefinementConfig;
export declare const LANDMARKS_REFINEMENT_LEFT_IRIS_CONFIG: LandmarksRefinementConfig;
export declare const LANDMARKS_REFINEMENT_RIGHT_IRIS_CONFIG: LandmarksRefinementConfig;
