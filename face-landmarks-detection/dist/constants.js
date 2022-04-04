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
exports.MEDIAPIPE_KEYPOINTS = exports.MEDIAPIPE_CONNECTED_KEYPOINTS_PAIRS = exports.MEDIAPIPE_KEYPOINTS_BY_CONTOUR = exports.MEDIAPIPE_FACEMESH_NUM_KEYPOINTS_WITH_IRISES = exports.MEDIAPIPE_FACEMESH_NUM_KEYPOINTS = void 0;
var faceMesh = require("@mediapipe/face_mesh");
exports.MEDIAPIPE_FACEMESH_NUM_KEYPOINTS = 468;
exports.MEDIAPIPE_FACEMESH_NUM_KEYPOINTS_WITH_IRISES = 478;
function connectionsToIndices(connections) {
    var indices = connections.map(function (connection) { return connection[0]; });
    indices.push(connections[connections.length - 1][1]);
    return indices;
}
exports.MEDIAPIPE_KEYPOINTS_BY_CONTOUR = {
    lips: connectionsToIndices(faceMesh.FACEMESH_LIPS),
    leftEye: connectionsToIndices(faceMesh.FACEMESH_LEFT_EYE),
    leftEyebrow: connectionsToIndices(faceMesh.FACEMESH_LEFT_EYEBROW),
    leftIris: connectionsToIndices(faceMesh.FACEMESH_LEFT_IRIS),
    rightEye: connectionsToIndices(faceMesh.FACEMESH_RIGHT_EYE),
    rightEyebrow: connectionsToIndices(faceMesh.FACEMESH_RIGHT_EYEBROW),
    rightIris: connectionsToIndices(faceMesh.FACEMESH_RIGHT_IRIS),
    faceOval: connectionsToIndices(faceMesh.FACEMESH_FACE_OVAL),
};
exports.MEDIAPIPE_CONNECTED_KEYPOINTS_PAIRS = faceMesh.FACEMESH_TESSELATION;
/**
 * Maps keypoint index to string label.
 * It turns MEDIAPIPE_KEYPOINTS_BY_CONTOUR which looks like {
 *   lips: [61, 146, 91, 181,...]
 *   leftEye: [263, 249, 390, 373, ...]
 *   ...
 * }
 * to the following form: [
 *   [61, lips],
 *   [146, lips],
 *   ...
 *   [263, leftEye],
 *   [249, leftEye],
 *   ...
 * ]
 */
var indexLabelPairs = Object.entries(exports.MEDIAPIPE_KEYPOINTS_BY_CONTOUR)
    .map(function (_a) {
    var label = _a[0], indices = _a[1];
    return indices.map(function (index) { return [index, label]; });
})
    .flat();
exports.MEDIAPIPE_KEYPOINTS = new Map(indexLabelPairs);
//# sourceMappingURL=constants.js.map