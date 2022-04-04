/**
    * @license
    * Copyright 2022 Google LLC. All Rights Reserved.
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    * http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    * =============================================================================
    */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@mediapipe/face_mesh'), require('@tensorflow/tfjs-core'), require('@tensorflow/tfjs-converter')) :
    typeof define === 'function' && define.amd ? define(['exports', '@mediapipe/face_mesh', '@tensorflow/tfjs-core', '@tensorflow/tfjs-converter'], factory) :
    (global = global || self, factory(global.faceLandmarksDetection = {}, global.globalThis, global.tf, global.tf));
}(this, (function (exports, faceMesh, tf, tfconv) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

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
    function connectionsToIndices(connections) {
        var indices = connections.map(function (connection) { return connection[0]; });
        indices.push(connections[connections.length - 1][1]);
        return indices;
    }
    var MEDIAPIPE_KEYPOINTS_BY_CONTOUR = {
        lips: connectionsToIndices(faceMesh.FACEMESH_LIPS),
        leftEye: connectionsToIndices(faceMesh.FACEMESH_LEFT_EYE),
        leftEyebrow: connectionsToIndices(faceMesh.FACEMESH_LEFT_EYEBROW),
        leftIris: connectionsToIndices(faceMesh.FACEMESH_LEFT_IRIS),
        rightEye: connectionsToIndices(faceMesh.FACEMESH_RIGHT_EYE),
        rightEyebrow: connectionsToIndices(faceMesh.FACEMESH_RIGHT_EYEBROW),
        rightIris: connectionsToIndices(faceMesh.FACEMESH_RIGHT_IRIS),
        faceOval: connectionsToIndices(faceMesh.FACEMESH_FACE_OVAL),
    };
    var MEDIAPIPE_CONNECTED_KEYPOINTS_PAIRS = faceMesh.FACEMESH_TESSELATION;
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
    var indexLabelPairs = Object.entries(MEDIAPIPE_KEYPOINTS_BY_CONTOUR)
        .map(function (_a) {
        var label = _a[0], indices = _a[1];
        return indices.map(function (index) { return [index, label]; });
    })
        .flat();
    var MEDIAPIPE_KEYPOINTS = new Map(indexLabelPairs);

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
    /**
     * Converts normalized Landmark to `Detection`. A relative bounding box will
     * be created containing all landmarks exactly.
     * @param landmarks List of normalized landmarks.
     *
     * @returns A `Detection`.
     */
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmarks_to_detection_calculator.cc
    function landmarksToDetection(landmarks) {
        var detection = { locationData: { relativeKeypoints: [] } };
        var xMin = Number.MAX_SAFE_INTEGER;
        var xMax = Number.MIN_SAFE_INTEGER;
        var yMin = Number.MAX_SAFE_INTEGER;
        var yMax = Number.MIN_SAFE_INTEGER;
        for (var i = 0; i < landmarks.length; ++i) {
            var landmark = landmarks[i];
            xMin = Math.min(xMin, landmark.x);
            xMax = Math.max(xMax, landmark.x);
            yMin = Math.min(yMin, landmark.y);
            yMax = Math.max(yMax, landmark.y);
            detection.locationData.relativeKeypoints.push({ x: landmark.x, y: landmark.y });
        }
        detection.locationData.relativeBoundingBox =
            { xMin: xMin, yMin: yMin, xMax: xMax, yMax: yMax, width: (xMax - xMin), height: (yMax - yMin) };
        return detection;
    }

    var DEFAULT_FACE_MESH_MODEL_CONFIG = {
        runtime: 'mediapipe',
        maxFaces: 1,
        refineLandmarks: false
    };

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
    function validateModelConfig(modelConfig) {
        if (modelConfig == null) {
            return __assign({}, DEFAULT_FACE_MESH_MODEL_CONFIG);
        }
        var config = __assign({}, modelConfig);
        config.runtime = 'mediapipe';
        if (config.maxFaces == null) {
            config.maxFaces = DEFAULT_FACE_MESH_MODEL_CONFIG.maxFaces;
        }
        if (config.refineLandmarks == null) {
            config.refineLandmarks = DEFAULT_FACE_MESH_MODEL_CONFIG.refineLandmarks;
        }
        return config;
    }

    /**
     * MediaPipe detector class.
     */
    var MediaPipeFaceMeshMediaPipeLandmarksDetector = /** @class */ (function () {
        // Should not be called outside.
        function MediaPipeFaceMeshMediaPipeLandmarksDetector(config) {
            var _this = this;
            // This will be filled out by asynchronous calls to onResults. They will be
            // stable after `await send` is called on the faces solution.
            this.width = 0;
            this.height = 0;
            this.selfieMode = false;
            this.faceMeshSolution = new faceMesh.FaceMesh({
                locateFile: function (path, base) {
                    if (config.solutionPath) {
                        var solutionPath = config.solutionPath.replace(/\/+$/, '');
                        return solutionPath + "/" + path;
                    }
                    return base + "/" + path;
                }
            });
            this.faceMeshSolution.setOptions({
                refineLandmarks: config.refineLandmarks,
                selfieMode: this.selfieMode,
                maxNumFaces: config.maxFaces,
            });
            this.faceMeshSolution.onResults(function (results) {
                _this.height = results.image.height;
                _this.width = results.image.width;
                _this.faces = [];
                if (results.multiFaceLandmarks !== null) {
                    var landmarksList = results.multiFaceLandmarks;
                    for (var i = 0; i < landmarksList.length; i++) {
                        var keypoints = _this.translateOutput(landmarksList[i]);
                        _this.faces.push({
                            keypoints: keypoints,
                            box: landmarksToDetection(keypoints).locationData.relativeBoundingBox
                        });
                    }
                }
            });
        }
        MediaPipeFaceMeshMediaPipeLandmarksDetector.prototype.translateOutput = function (landmarks) {
            var _this = this;
            var keypoints = landmarks.map(function (landmark, i) {
                var keypoint = {
                    x: landmark.x * _this.width,
                    y: landmark.y * _this.height,
                    z: landmark.z * _this.width,
                };
                var name = MEDIAPIPE_KEYPOINTS.get(i);
                if (name != null) {
                    keypoint.name = name;
                }
                return keypoint;
            });
            return keypoints;
        };
        /**
         * Estimates faces for an image or video frame.
         *
         * It returns a single face or multiple faces based on the maxFaceMesh
         * parameter passed to the constructor of the class.
         *
         * @param input
         * ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement The input
         * image to feed through the network.
         *
         * @param config Optional.
         *       flipHorizontal: Optional. Default to false. When image data comes
         *       from camera, the result has to flip horizontally.
         *
         *       staticImageMode: Optional. Defaults to false. Currently unused in
         * this implementation. Image input types are assumed to be static images, and
         * video inputs are assumed to be non static images.
         *
         * @return An array of `Face`s.
         */
        MediaPipeFaceMeshMediaPipeLandmarksDetector.prototype.estimateFaces = function (input, estimationConfig) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (estimationConfig && estimationConfig.flipHorizontal &&
                                (estimationConfig.flipHorizontal !== this.selfieMode)) {
                                this.selfieMode = estimationConfig.flipHorizontal;
                                this.faceMeshSolution.setOptions({
                                    selfieMode: this.selfieMode,
                                });
                            }
                            if (!(input instanceof tf.Tensor)) return [3 /*break*/, 2];
                            _b = ImageData.bind;
                            return [4 /*yield*/, tf.browser.toPixels(input)];
                        case 1:
                            _a = new (_b.apply(ImageData, [void 0, _c.sent(), input.shape[1], input.shape[0]]))();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = input;
                            _c.label = 3;
                        case 3:
                            // Cast to GL TexImageSource types.
                            input = _a;
                            return [4 /*yield*/, this.faceMeshSolution.send({ image: input })];
                        case 4:
                            _c.sent();
                            return [2 /*return*/, this.faces];
                    }
                });
            });
        };
        MediaPipeFaceMeshMediaPipeLandmarksDetector.prototype.dispose = function () {
            this.faceMeshSolution.close();
        };
        MediaPipeFaceMeshMediaPipeLandmarksDetector.prototype.reset = function () {
            this.faceMeshSolution.reset();
            this.width = 0;
            this.height = 0;
            this.faces = null;
            this.selfieMode = false;
        };
        MediaPipeFaceMeshMediaPipeLandmarksDetector.prototype.initialize = function () {
            return this.faceMeshSolution.initialize();
        };
        return MediaPipeFaceMeshMediaPipeLandmarksDetector;
    }());
    /**
     * Loads the MediaPipe solution.
     *
     * @param modelConfig An object that contains parameters for
     * the MediaPipeFaceMesh loading process. Please find more details of each
     * parameters in the documentation of the
     * `MediaPipeFaceMeshMediaPipeModelConfig` interface.
     */
    function load(modelConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var config, detector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = validateModelConfig(modelConfig);
                        detector = new MediaPipeFaceMeshMediaPipeLandmarksDetector(config);
                        return [4 /*yield*/, detector.initialize()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, detector];
                }
            });
        });
    }

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
    function area(rect) {
        return rect.width * rect.height;
    }
    function intersects(rect1, rect2) {
        return !(rect1.xMax < rect2.xMin || rect2.xMax < rect1.xMin ||
            rect1.yMax < rect2.yMin || rect2.yMax < rect1.yMin);
    }
    function intersect(rect1, rect2) {
        var xMin = Math.max(rect1.xMin, rect2.xMin);
        var xMax = Math.min(rect1.xMax, rect2.xMax);
        var yMin = Math.max(rect1.yMin, rect2.yMin);
        var yMax = Math.min(rect1.yMax, rect2.yMax);
        var width = Math.max(xMax - xMin, 0);
        var height = Math.max(yMax - yMin, 0);
        return { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax, width: width, height: height };
    }
    function getBoundingBox(rect) {
        var xMin = rect.xCenter - rect.width / 2;
        var xMax = xMin + rect.width;
        var yMin = rect.yCenter - rect.height / 2;
        var yMax = yMin + rect.height;
        return { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax, width: rect.width, height: rect.height };
    }
    function overlapSimilarity(rect1, rect2) {
        var bbox1 = getBoundingBox(rect1);
        var bbox2 = getBoundingBox(rect2);
        if (!intersects(bbox1, bbox2)) {
            return 0;
        }
        var intersectionArea = area(intersect(bbox1, bbox2));
        var normalization = area(bbox1) + area(bbox2) - intersectionArea;
        return normalization > 0 ? intersectionArea / normalization : 0;
    }
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/association_norm_rect_calculator.cc
    // Propgating ids from previous to current is not performed by this code.
    function calculateAssociationNormRect(rectsArray, minSimilarityThreshold) {
        var result = [];
        // rectsArray elements are interpreted to be sorted in reverse priority order,
        // so later elements are higher in priority. This means that if there's a
        // large overlap, the later rect will be added and the older rect will be
        // removed.
        rectsArray.forEach(function (rects) { return rects.forEach(function (curRect) {
            result = result.filter(function (prevRect) {
                return overlapSimilarity(curRect, prevRect) <= minSimilarityThreshold;
            });
            result.push(curRect);
        }); });
        return result;
    }

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
    /**
     * Projects normalized landmarks in a rectangle to its original coordinates. The
     * rectangle must also be in normalized coordinates.
     * @param landmarks A normalized Landmark list representing landmarks in a
     *     normalized rectangle.
     * @param inputRect A normalized rectangle.
     * @param config Config object has one field ignoreRotation, default to false.
     */
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmark_projection_calculator.cc
    function calculateLandmarkProjection(landmarks, inputRect, config) {
        if (config === void 0) { config = {
            ignoreRotation: false
        }; }
        var outputLandmarks = [];
        for (var _i = 0, landmarks_1 = landmarks; _i < landmarks_1.length; _i++) {
            var landmark = landmarks_1[_i];
            var x = landmark.x - 0.5;
            var y = landmark.y - 0.5;
            var angle = config.ignoreRotation ? 0 : inputRect.rotation;
            var newX = Math.cos(angle) * x - Math.sin(angle) * y;
            var newY = Math.sin(angle) * x + Math.cos(angle) * y;
            newX = newX * inputRect.width + inputRect.xCenter;
            newY = newY * inputRect.height + inputRect.yCenter;
            var newZ = landmark.z * inputRect.width; // Scale Z coordinate as x.
            var newLandmark = __assign({}, landmark);
            newLandmark.x = newX;
            newLandmark.y = newY;
            newLandmark.z = newZ;
            outputLandmarks.push(newLandmark);
        }
        return outputLandmarks;
    }

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
    function matrix4x4ToArray(matrix) {
        return [].concat.apply([], matrix);
    }
    function arrayToMatrix4x4(array) {
        if (array.length !== 16) {
            throw new Error("Array length must be 16 but got " + array.length);
        }
        return [
            [array[0], array[1], array[2], array[3]],
            [array[4], array[5], array[6], array[7]],
            [array[8], array[9], array[10], array[11]],
            [array[12], array[13], array[14], array[15]],
        ];
    }

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
    /**
     * Generates a 4x4 projective transform matrix M, so that for any point in the
     * subRect image p(x, y), we can use the matrix to calculate the projected point
     * in the original image p' (x', y'): p' = p * M;
     *
     * @param subRect Rotated sub rect in absolute coordinates.
     * @param rectWidth
     * @param rectHeight
     * @param flipHorizontaly Whether to flip the image horizontally.
     */
    // Ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/tensor/image_to_tensor_utils.h
    function getRotatedSubRectToRectTransformMatrix(subRect, rectWidth, rectHeight, flipHorizontally) {
        // The resulting matrix is multiplication of below commented out matrices:
        //   postScaleMatrix
        //     * translateMatrix
        //     * rotateMatrix
        //     * flipMatrix
        //     * scaleMatrix
        //     * initialTranslateMatrix
        // For any point in the transformed image p, we can use the above matrix to
        // calculate the projected point in the original image p'. So that:
        // p' = p * M;
        // Note: The transform matrix below assumes image coordinates is normalized
        // to [0, 1] range.
        // Matrix to convert X,Y to [-0.5, 0.5] range "initialTranslateMatrix"
        // [ 1.0,  0.0, 0.0, -0.5]
        // [ 0.0,  1.0, 0.0, -0.5]
        // [ 0.0,  0.0, 1.0,  0.0]
        // [ 0.0,  0.0, 0.0,  1.0]
        var a = subRect.width;
        var b = subRect.height;
        // Matrix to scale X,Y,Z to sub rect "scaleMatrix"
        // Z has the same scale as X.
        // [   a, 0.0, 0.0, 0.0]
        // [0.0,    b, 0.0, 0.0]
        // [0.0, 0.0,    a, 0.0]
        // [0.0, 0.0, 0.0, 1.0]
        var flip = flipHorizontally ? -1 : 1;
        // Matrix for optional horizontal flip around middle of output image.
        // [ fl  , 0.0, 0.0, 0.0]
        // [ 0.0, 1.0, 0.0, 0.0]
        // [ 0.0, 0.0, 1.0, 0.0]
        // [ 0.0, 0.0, 0.0, 1.0]
        var c = Math.cos(subRect.rotation);
        var d = Math.sin(subRect.rotation);
        // Matrix to do rotation around Z axis "rotateMatrix"
        // [    c,   -d, 0.0, 0.0]
        // [    d,    c, 0.0, 0.0]
        // [ 0.0, 0.0, 1.0, 0.0]
        // [ 0.0, 0.0, 0.0, 1.0]
        var e = subRect.xCenter;
        var f = subRect.yCenter;
        // Matrix to do X,Y translation of sub rect within parent rect
        // "translateMatrix"
        // [1.0, 0.0, 0.0, e   ]
        // [0.0, 1.0, 0.0, f   ]
        // [0.0, 0.0, 1.0, 0.0]
        // [0.0, 0.0, 0.0, 1.0]
        var g = 1.0 / rectWidth;
        var h = 1.0 / rectHeight;
        // Matrix to scale X,Y,Z to [0.0, 1.0] range "postScaleMatrix"
        // [g,    0.0, 0.0, 0.0]
        // [0.0, h,    0.0, 0.0]
        // [0.0, 0.0,    g, 0.0]
        // [0.0, 0.0, 0.0, 1.0]
        var matrix = new Array(16);
        // row 1
        matrix[0] = a * c * flip * g;
        matrix[1] = -b * d * g;
        matrix[2] = 0.0;
        matrix[3] = (-0.5 * a * c * flip + 0.5 * b * d + e) * g;
        // row 2
        matrix[4] = a * d * flip * h;
        matrix[5] = b * c * h;
        matrix[6] = 0.0;
        matrix[7] = (-0.5 * b * c - 0.5 * a * d * flip + f) * h;
        // row 3
        matrix[8] = 0.0;
        matrix[9] = 0.0;
        matrix[10] = a * g;
        matrix[11] = 0.0;
        // row 4
        matrix[12] = 0.0;
        matrix[13] = 0.0;
        matrix[14] = 0.0;
        matrix[15] = 1.0;
        return arrayToMatrix4x4(matrix);
    }

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
    function getImageSize(input) {
        if (input instanceof tf.Tensor) {
            return { height: input.shape[0], width: input.shape[1] };
        }
        else {
            return { height: input.height, width: input.width };
        }
    }
    /**
     * Normalizes the provided angle to the range -pi to pi.
     * @param angle The angle in radians to be normalized.
     */
    function normalizeRadians(angle) {
        return angle - 2 * Math.PI * Math.floor((angle + Math.PI) / (2 * Math.PI));
    }
    /**
     * Transform value ranges.
     * @param fromMin Min of original value range.
     * @param fromMax Max of original value range.
     * @param toMin New min of transformed value range.
     * @param toMax New max of transformed value range.
     */
    function transformValueRange(fromMin, fromMax, toMin, toMax) {
        var fromRange = fromMax - fromMin;
        var toRange = toMax - toMin;
        if (fromRange === 0) {
            throw new Error("Original min and max are both " + fromMin + ", range cannot be 0.");
        }
        var scale = toRange / fromRange;
        var offset = toMin - fromMin * scale;
        return { scale: scale, offset: offset };
    }
    /**
     * Convert an image to an image tensor representation.
     *
     * The image tensor has a shape [1, height, width, colorChannel].
     *
     * @param input An image, video frame, or image tensor.
     */
    function toImageTensor(input) {
        return input instanceof tf.Tensor ? input : tf.browser.fromPixels(input);
    }
    /**
     * Padding ratio of left, top, right, bottom, based on the output dimensions.
     *
     * The padding values are non-zero only when the "keep_aspect_ratio" is true.
     *
     * For instance, when the input image is 10x10 (width x height) and the
     * output dimensions is 20x40 and "keep_aspect_ratio" is true, we should scale
     * the input image to 20x20 and places it in the middle of the output image with
     * an equal padding of 10 pixels at the top and the bottom. The result is
     * therefore {left: 0, top: 0.25, right: 0, bottom: 0.25} (10/40 = 0.25f).
     * @param roi The original rectangle to pad.
     * @param targetSize The target width and height of the result rectangle.
     * @param keepAspectRatio Whether keep aspect ratio. Default to false.
     */
    function padRoi(roi, targetSize, keepAspectRatio) {
        if (keepAspectRatio === void 0) { keepAspectRatio = false; }
        if (!keepAspectRatio) {
            return { top: 0, left: 0, right: 0, bottom: 0 };
        }
        var targetH = targetSize.height;
        var targetW = targetSize.width;
        validateSize(targetSize, 'targetSize');
        validateSize(roi, 'roi');
        var tensorAspectRatio = targetH / targetW;
        var roiAspectRatio = roi.height / roi.width;
        var newWidth;
        var newHeight;
        var horizontalPadding = 0;
        var verticalPadding = 0;
        if (tensorAspectRatio > roiAspectRatio) {
            // pad height;
            newWidth = roi.width;
            newHeight = roi.width * tensorAspectRatio;
            verticalPadding = (1 - roiAspectRatio / tensorAspectRatio) / 2;
        }
        else {
            // pad width.
            newWidth = roi.height / tensorAspectRatio;
            newHeight = roi.height;
            horizontalPadding = (1 - tensorAspectRatio / roiAspectRatio) / 2;
        }
        roi.width = newWidth;
        roi.height = newHeight;
        return {
            top: verticalPadding,
            left: horizontalPadding,
            right: horizontalPadding,
            bottom: verticalPadding
        };
    }
    /**
     * Get the rectangle information of an image, including xCenter, yCenter, width,
     * height and rotation.
     *
     * @param imageSize imageSize is used to calculate the rectangle.
     * @param normRect Optional. If normRect is not null, it will be used to get
     *     a subarea rectangle information in the image. `imageSize` is used to
     *     calculate the actual non-normalized coordinates.
     */
    function getRoi(imageSize, normRect) {
        if (normRect) {
            return {
                xCenter: normRect.xCenter * imageSize.width,
                yCenter: normRect.yCenter * imageSize.height,
                width: normRect.width * imageSize.width,
                height: normRect.height * imageSize.height,
                rotation: normRect.rotation
            };
        }
        else {
            return {
                xCenter: 0.5 * imageSize.width,
                yCenter: 0.5 * imageSize.height,
                width: imageSize.width,
                height: imageSize.height,
                rotation: 0
            };
        }
    }
    /**
     * Generate the projective transformation matrix to be used for `tf.transform`.
     *
     * See more documentation in `tf.transform`.
     *
     * @param matrix The transformation matrix mapping subRect to rect, can be
     *     computed using `getRotatedSubRectToRectTransformMatrix` calculator.
     * @param imageSize The original image height and width.
     * @param inputResolution The target height and width.
     */
    function getProjectiveTransformMatrix(matrix, imageSize, inputResolution) {
        validateSize(inputResolution, 'inputResolution');
        // To use M with regular x, y coordinates, we need to normalize them first.
        // Because x' = a0 * x + a1 * y + a2, y' = b0 * x + b1 * y + b2,
        // we need to use factor (1/inputResolution.width) to normalize x for a0 and
        // b0, similarly we need to use factor (1/inputResolution.height) to normalize
        // y for a1 and b1.
        // Also at the end, we need to de-normalize x' and y' to regular coordinates.
        // So we need to use factor imageSize.width for a0, a1 and a2, similarly
        // we need to use factor imageSize.height for b0, b1 and b2.
        var a0 = (1 / inputResolution.width) * matrix[0][0] * imageSize.width;
        var a1 = (1 / inputResolution.height) * matrix[0][1] * imageSize.width;
        var a2 = matrix[0][3] * imageSize.width;
        var b0 = (1 / inputResolution.width) * matrix[1][0] * imageSize.height;
        var b1 = (1 / inputResolution.height) * matrix[1][1] * imageSize.height;
        var b2 = matrix[1][3] * imageSize.height;
        return [a0, a1, a2, b0, b1, b2, 0, 0];
    }
    function validateSize(size, name) {
        tf.util.assert(size.width !== 0, function () { return name + " width cannot be 0."; });
        tf.util.assert(size.height !== 0, function () { return name + " height cannot be 0."; });
    }

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
    function shiftImageValue(image, outputFloatRange) {
        // Calculate the scale and offset to shift from [0, 255] to [-1, 1].
        var valueRange = transformValueRange(0, 255, outputFloatRange[0] /* min */, outputFloatRange[1] /* max */);
        // Shift value range.
        return tf.tidy(function () { return tf.add(tf.mul(image, valueRange.scale), valueRange.offset); });
    }

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
    /**
     * Convert an image or part of it to an image tensor.
     *
     * @param image An image, video frame or image tensor.
     * @param config
     *      inputResolution: The target height and width.
     *      keepAspectRatio?: Whether target tensor should keep aspect ratio.
     * @param normRect A normalized rectangle, representing the subarea to crop from
     *      the image. If normRect is provided, the returned image tensor represents
     *      the subarea.
     * @returns A map with the following properties:
     *     - imageTensor
     *     - padding: Padding ratio of left, top, right, bottom, based on the output
     * dimensions.
     *     - transformationMatrix: Projective transform matrix used to transform
     * input image to transformed image.
     */
    function convertImageToTensor(image, config, normRect) {
        var outputTensorSize = config.outputTensorSize, keepAspectRatio = config.keepAspectRatio, borderMode = config.borderMode, outputTensorFloatRange = config.outputTensorFloatRange;
        // Ref:
        // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/tensor/image_to_tensor_calculator.cc
        var imageSize = getImageSize(image);
        var roi = getRoi(imageSize, normRect);
        var padding = padRoi(roi, outputTensorSize, keepAspectRatio);
        var transformationMatrix = getRotatedSubRectToRectTransformMatrix(roi, imageSize.width, imageSize.height, false);
        var imageTensor = tf.tidy(function () {
            var $image = toImageTensor(image);
            var transformMatrix = tf.tensor2d(getProjectiveTransformMatrix(transformationMatrix, imageSize, outputTensorSize), [1, 8]);
            var fillMode = borderMode === 'zero' ? 'constant' : 'nearest';
            var imageTransformed = tf.image.transform(
            // tslint:disable-next-line: no-unnecessary-type-assertion
            tf.expandDims(tf.cast($image, 'float32')), transformMatrix, 'bilinear', fillMode, 0, [outputTensorSize.height, outputTensorSize.width]);
            var imageShifted = outputTensorFloatRange != null ?
                shiftImageValue(imageTransformed, outputTensorFloatRange) :
                imageTransformed;
            return imageShifted;
        });
        return { imageTensor: imageTensor, padding: padding, transformationMatrix: transformationMatrix };
    }

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
    // ref:
    // https://github.com/google/mediapipe/blob/350fbb2100ad531bc110b93aaea23d96af5a5064/mediapipe/calculators/tflite/ssd_anchors_calculator.cc
    function createSsdAnchors(config) {
        // Set defaults.
        if (config.reduceBoxesInLowestLayer == null) {
            config.reduceBoxesInLowestLayer = false;
        }
        if (config.interpolatedScaleAspectRatio == null) {
            config.interpolatedScaleAspectRatio = 1.0;
        }
        if (config.fixedAnchorSize == null) {
            config.fixedAnchorSize = false;
        }
        var anchors = [];
        var layerId = 0;
        while (layerId < config.numLayers) {
            var anchorHeight = [];
            var anchorWidth = [];
            var aspectRatios = [];
            var scales = [];
            // For same strides, we merge the anchors in the same order.
            var lastSameStrideLayer = layerId;
            while (lastSameStrideLayer < config.strides.length &&
                config.strides[lastSameStrideLayer] === config.strides[layerId]) {
                var scale = calculateScale(config.minScale, config.maxScale, lastSameStrideLayer, config.strides.length);
                if (lastSameStrideLayer === 0 && config.reduceBoxesInLowestLayer) {
                    // For first layer, it can be specified to use predefined anchors.
                    aspectRatios.push(1);
                    aspectRatios.push(2);
                    aspectRatios.push(0.5);
                    scales.push(0.1);
                    scales.push(scale);
                    scales.push(scale);
                }
                else {
                    for (var aspectRatioId = 0; aspectRatioId < config.aspectRatios.length; ++aspectRatioId) {
                        aspectRatios.push(config.aspectRatios[aspectRatioId]);
                        scales.push(scale);
                    }
                    if (config.interpolatedScaleAspectRatio > 0.0) {
                        var scaleNext = lastSameStrideLayer === config.strides.length - 1 ?
                            1.0 :
                            calculateScale(config.minScale, config.maxScale, lastSameStrideLayer + 1, config.strides.length);
                        scales.push(Math.sqrt(scale * scaleNext));
                        aspectRatios.push(config.interpolatedScaleAspectRatio);
                    }
                }
                lastSameStrideLayer++;
            }
            for (var i = 0; i < aspectRatios.length; ++i) {
                var ratioSqrts = Math.sqrt(aspectRatios[i]);
                anchorHeight.push(scales[i] / ratioSqrts);
                anchorWidth.push(scales[i] * ratioSqrts);
            }
            var featureMapHeight = 0;
            var featureMapWidth = 0;
            if (config.featureMapHeight.length > 0) {
                featureMapHeight = config.featureMapHeight[layerId];
                featureMapWidth = config.featureMapWidth[layerId];
            }
            else {
                var stride = config.strides[layerId];
                featureMapHeight = Math.ceil(config.inputSizeHeight / stride);
                featureMapWidth = Math.ceil(config.inputSizeWidth / stride);
            }
            for (var y = 0; y < featureMapHeight; ++y) {
                for (var x = 0; x < featureMapWidth; ++x) {
                    for (var anchorId = 0; anchorId < anchorHeight.length; ++anchorId) {
                        var xCenter = (x + config.anchorOffsetX) / featureMapWidth;
                        var yCenter = (y + config.anchorOffsetY) / featureMapHeight;
                        var newAnchor = { xCenter: xCenter, yCenter: yCenter, width: 0, height: 0 };
                        if (config.fixedAnchorSize) {
                            newAnchor.width = 1.0;
                            newAnchor.height = 1.0;
                        }
                        else {
                            newAnchor.width = anchorWidth[anchorId];
                            newAnchor.height = anchorHeight[anchorId];
                        }
                        anchors.push(newAnchor);
                    }
                }
            }
            layerId = lastSameStrideLayer;
        }
        return anchors;
    }
    function calculateScale(minScale, maxScale, strideIndex, numStrides) {
        if (numStrides === 1) {
            return (minScale + maxScale) * 0.5;
        }
        else {
            return minScale + (maxScale - minScale) * strideIndex / (numStrides - 1);
        }
    }

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
    function project(projectionMatrix, _a) {
        var x = _a[0], y = _a[1];
        return [
            x * projectionMatrix[0] + y * projectionMatrix[1] + projectionMatrix[3],
            x * projectionMatrix[4] + y * projectionMatrix[5] + projectionMatrix[7]
        ];
    }
    /**
     * Projects detections to a different coordinate system using a provided
     * projection matrix.
     *
     * @param detections A list of detections to project using the provided
     *     projection matrix.
     * @param projectionMatrix Maps data from one coordinate system to     another.
     * @returns detections: A list of projected detections
     */
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/detection_projection_calculator.cc
    function detectionProjection(detections, projectionMatrix) {
        if (detections === void 0) { detections = []; }
        var flatProjectionMatrix = matrix4x4ToArray(projectionMatrix);
        detections.forEach(function (detection) {
            var locationData = detection.locationData;
            // Project keypoints.
            locationData.relativeKeypoints.forEach(function (keypoint) {
                var _a = project(flatProjectionMatrix, [keypoint.x, keypoint.y]), x = _a[0], y = _a[1];
                keypoint.x = x;
                keypoint.y = y;
            });
            // Project bounding box.
            var box = locationData.relativeBoundingBox;
            var xMin = Number.MAX_VALUE, yMin = Number.MAX_VALUE, xMax = Number.MIN_VALUE, yMax = Number.MIN_VALUE;
            [[box.xMin, box.yMin], [box.xMin + box.width, box.yMin],
                [box.xMin + box.width, box.yMin + box.height],
                [box.xMin, box.yMin + box.height]]
                .forEach(function (coordinate) {
                // a) Define and project box points.
                var _a = project(flatProjectionMatrix, coordinate), x = _a[0], y = _a[1];
                // b) Find new left top and right bottom points for a box which
                // encompases
                //    non-projected (rotated) box.
                xMin = Math.min(xMin, x);
                xMax = Math.max(xMax, x);
                yMin = Math.min(yMin, y);
                yMax = Math.max(yMax, y);
            });
            locationData.relativeBoundingBox =
                { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax, width: xMax - xMin, height: yMax - yMin };
        });
        return detections;
    }

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
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/detections_to_rects_calculator.cc
    function computeRotation(detection, imageSize, config) {
        var locationData = detection.locationData;
        var startKeypoint = config.rotationVectorStartKeypointIndex;
        var endKeypoint = config.rotationVectorEndKeypointIndex;
        var targetAngle;
        if (config.rotationVectorTargetAngle) {
            targetAngle = config.rotationVectorTargetAngle;
        }
        else {
            targetAngle = Math.PI * config.rotationVectorTargetAngleDegree / 180;
        }
        var x0 = locationData.relativeKeypoints[startKeypoint].x * imageSize.width;
        var y0 = locationData.relativeKeypoints[startKeypoint].y * imageSize.height;
        var x1 = locationData.relativeKeypoints[endKeypoint].x * imageSize.width;
        var y1 = locationData.relativeKeypoints[endKeypoint].y * imageSize.height;
        var rotation = normalizeRadians(targetAngle - Math.atan2(-(y1 - y0), x1 - x0));
        return rotation;
    }
    function rectFromBox(box) {
        return {
            xCenter: box.xMin + box.width / 2,
            yCenter: box.yMin + box.height / 2,
            width: box.width,
            height: box.height,
        };
    }
    function normRectFromKeypoints(locationData) {
        var keypoints = locationData.relativeKeypoints;
        if (keypoints.length <= 1) {
            throw new Error('2 or more keypoints required to calculate a rect.');
        }
        var xMin = Number.MAX_VALUE, yMin = Number.MAX_VALUE, xMax = Number.MIN_VALUE, yMax = Number.MIN_VALUE;
        keypoints.forEach(function (keypoint) {
            xMin = Math.min(xMin, keypoint.x);
            xMax = Math.max(xMax, keypoint.x);
            yMin = Math.min(yMin, keypoint.y);
            yMax = Math.max(yMax, keypoint.y);
        });
        return {
            xCenter: (xMin + xMax) / 2,
            yCenter: (yMin + yMax) / 2,
            width: xMax - xMin,
            height: yMax - yMin
        };
    }
    function detectionToNormalizedRect(detection, conversionMode) {
        var locationData = detection.locationData;
        return conversionMode === 'boundingbox' ?
            rectFromBox(locationData.relativeBoundingBox) :
            normRectFromKeypoints(locationData);
    }
    function detectionToRect(detection, conversionMode, imageSize) {
        var locationData = detection.locationData;
        var rect;
        if (conversionMode === 'boundingbox') {
            rect = rectFromBox(locationData.boundingBox);
        }
        else {
            rect = normRectFromKeypoints(locationData);
            var width = imageSize.width, height = imageSize.height;
            rect.xCenter = Math.round(rect.xCenter * width);
            rect.yCenter = Math.round(rect.yCenter * height);
            rect.width = Math.round(rect.width * width);
            rect.height = Math.round(rect.height * height);
        }
        return rect;
    }
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/detections_to_rects_calculator.cc
    function calculateDetectionsToRects(detection, conversionMode, outputType, imageSize, rotationConfig) {
        var rect = outputType === 'rect' ?
            detectionToRect(detection, conversionMode, imageSize) :
            detectionToNormalizedRect(detection, conversionMode);
        if (rotationConfig) {
            rect.rotation = computeRotation(detection, imageSize, rotationConfig);
        }
        return rect;
    }

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
    function splitDetectionResult(detectionResult) {
        return tf.tidy(function () {
            // logit is stored in the first element in each anchor data.
            var logits = tf.slice(detectionResult, [0, 0, 0], [1, -1, 1]);
            // Bounding box coords are stored in the next four elements for each anchor
            // point.
            var rawBoxes = tf.slice(detectionResult, [0, 0, 1], [1, -1, -1]);
            return [logits, rawBoxes];
        });
    }

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
    function detectorResult(detectionResult) {
        return tf.tidy(function () {
            var _a = splitDetectionResult(detectionResult), logits = _a[0], rawBoxes = _a[1];
            // Shape [896, 12]
            var rawBoxes2d = tf.squeeze(rawBoxes);
            // Shape [896]
            var logits1d = tf.squeeze(logits);
            return { boxes: rawBoxes2d, logits: logits1d };
        });
    }

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
    function getNumberOfRefinedLandmarks(refinements) {
        // Gather all used indexes.
        var indices = [].concat.apply([], refinements.map(function (refinement) { return refinement.indexesMapping; }));
        if (indices.length === 0) {
            throw new Error('There should be at least one landmark in indexes mapping');
        }
        var minIndex = indices[0], maxIndex = indices[0];
        var uniqueIndices = new Set(indices);
        uniqueIndices.forEach(function (index) {
            minIndex = Math.min(minIndex, index);
            maxIndex = Math.max(maxIndex, index);
        });
        // Check that indxes start with 0 and there is no gaps between min and max
        // indexes.
        var numIndices = uniqueIndices.size;
        if (minIndex !== 0) {
            throw new Error("Indexes are expected to start with 0 instead of " + minIndex);
        }
        if (maxIndex + 1 !== numIndices) {
            throw new Error("Indexes should have no gaps but " + (maxIndex - numIndices + 1) + " indexes are missing");
        }
        return numIndices;
    }
    function refineXY(indexesMapping, landmarks, refinedLandmarks) {
        for (var i = 0; i < landmarks.length; ++i) {
            var landmark = landmarks[i];
            var refinedLandmark = { x: landmark.x, y: landmark.y };
            refinedLandmarks[indexesMapping[i]] = refinedLandmark;
        }
    }
    function getZAverage(landmarks, indexes) {
        var zSum = 0;
        for (var i = 0; i < indexes.length; ++i) {
            zSum += landmarks[indexes[i]].z;
        }
        return zSum / indexes.length;
    }
    function refineZ(indexesMapping, zRefinement, landmarks, refinedLandmarks) {
        if (typeof zRefinement === 'string') {
            switch (zRefinement) {
                case 'copy': {
                    for (var i = 0; i < landmarks.length; ++i) {
                        refinedLandmarks[indexesMapping[i]].z = landmarks[i].z;
                    }
                    break;
                }
            }
        }
        else {
            var zAverage = getZAverage(refinedLandmarks, zRefinement);
            for (var i = 0; i < indexesMapping.length; ++i) {
                refinedLandmarks[indexesMapping[i]].z = zAverage;
            }
        }
    }
    /**
     * Refine one set of landmarks with another.
     *
     * @param allLandmarks List of landmarks to use for refinement. They will be
     *     applied to the output in the provided order. Each list should be non
     *     empty and contain the same amount of landmarks as indexes in mapping.
     * @param refinements Refinement instructions for input landmarks.
     *
     * @returns A list of refined landmarks.
     */
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmarks_refinement_calculator.cc
    function landmarksRefinement(allLandmarks, refinements) {
        // Initialize refined landmarks list.
        var numRefinedLandmarks = getNumberOfRefinedLandmarks(refinements);
        var refinedLandmarks = new Array(numRefinedLandmarks);
        // Apply input landmarks to output refined landmarks in provided order.
        for (var i = 0; i < allLandmarks.length; ++i) {
            var landmarks = allLandmarks[i];
            var refinement = refinements[i];
            if (landmarks.length !== refinement.indexesMapping.length) {
                // Check number of landmarks in mapping and stream are the same.
                throw new Error("There are " + landmarks.length + " refinement landmarks while mapping has " + refinement.indexesMapping.length);
            }
            // Refine X and Y.
            refineXY(refinement.indexesMapping, landmarks, refinedLandmarks);
            // Refine Z.
            refineZ(refinement.indexesMapping, refinement.zRefinement, landmarks, refinedLandmarks);
            // Visibility and presence are not currently refined and are left as `0`.
        }
        return refinedLandmarks;
    }

    function nonMaxSuppression(detections, maxDetections, iouThreshold, 
    // Currently only IOU overap is supported.
    overlapType) {
        return __awaiter(this, void 0, void 0, function () {
            var detectionsTensor, scoresTensor, selectedIdsTensor, selectedIds, selectedDetections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Sort to match NonMaxSuppresion calculator's decreasing detection score
                        // traversal.
                        // NonMaxSuppresionCalculator: RetainMaxScoringLabelOnly
                        detections.sort(function (detectionA, detectionB) {
                            return Math.max.apply(Math, detectionB.score) - Math.max.apply(Math, detectionA.score);
                        });
                        detectionsTensor = tf.tensor2d(detections.map(function (d) {
                            return [d.locationData.relativeBoundingBox.yMin,
                                d.locationData.relativeBoundingBox.xMin,
                                d.locationData.relativeBoundingBox.yMax,
                                d.locationData.relativeBoundingBox.xMax];
                        }));
                        scoresTensor = tf.tensor1d(detections.map(function (d) { return d.score[0]; }));
                        return [4 /*yield*/, tf.image.nonMaxSuppressionAsync(detectionsTensor, scoresTensor, maxDetections, iouThreshold)];
                    case 1:
                        selectedIdsTensor = _a.sent();
                        return [4 /*yield*/, selectedIdsTensor.array()];
                    case 2:
                        selectedIds = _a.sent();
                        selectedDetections = detections.filter(function (_, i) { return (selectedIds.indexOf(i) > -1); });
                        tf.dispose([detectionsTensor, scoresTensor, selectedIdsTensor]);
                        return [2 /*return*/, selectedDetections];
                }
            });
        });
    }

    function normalizedKeypointsToKeypoints(normalizedKeypoints, imageSize) {
        return normalizedKeypoints.map(function (normalizedKeypoint) {
            var keypoint = __assign(__assign({}, normalizedKeypoint), { x: normalizedKeypoint.x * imageSize.width, y: normalizedKeypoint.y * imageSize.height });
            if (normalizedKeypoint.z != null) {
                // Scale z the same way as x (using image width).
                keypoint.z = normalizedKeypoint.z * imageSize.width;
            }
            return keypoint;
        });
    }

    /**
     * Convert result Tensors from object detection models into Detection boxes.
     *
     * @param detectionTensors List of Tensors of type Float32. The list of tensors
     *     can have 2 or 3 tensors. First tensor is the predicted raw
     *     boxes/keypoints. The size of the values must be
     *     (num_boxes * num_predicted_values). Second tensor is the score tensor.
     *     The size of the valuse must be (num_boxes * num_classes). It's optional
     *     to pass in a third tensor for anchors (e.g. for SSD models) depend on the
     *     outputs of the detection model. The size of anchor tensor must be
     *     (num_boxes * 4).
     * @param anchor A tensor for anchors. The size of anchor tensor must be
     *     (num_boxes * 4).
     * @param config
     */
    function tensorsToDetections(detectionTensors, anchor, config) {
        return __awaiter(this, void 0, void 0, function () {
            var rawScoreTensor, rawBoxTensor, boxes, normalizedScore, outputDetections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rawScoreTensor = detectionTensors[0];
                        rawBoxTensor = detectionTensors[1];
                        boxes = decodeBoxes(rawBoxTensor, anchor, config);
                        normalizedScore = tf.tidy(function () {
                            var normalizedScore = rawScoreTensor;
                            if (config.sigmoidScore) {
                                if (config.scoreClippingThresh != null) {
                                    normalizedScore = tf.clipByValue(rawScoreTensor, -config.scoreClippingThresh, config.scoreClippingThresh);
                                }
                                normalizedScore = tf.sigmoid(normalizedScore);
                                return normalizedScore;
                            }
                            return normalizedScore;
                        });
                        return [4 /*yield*/, convertToDetections(boxes, normalizedScore, config)];
                    case 1:
                        outputDetections = _a.sent();
                        tf.dispose([boxes, normalizedScore]);
                        return [2 /*return*/, outputDetections];
                }
            });
        });
    }
    function convertToDetections(detectionBoxes, detectionScore, config) {
        return __awaiter(this, void 0, void 0, function () {
            var outputDetections, detectionBoxesData, detectionScoresData, i, boxOffset, detection, bbox, locationData, totalIdx, kpId, keypointIndex, keypoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outputDetections = [];
                        return [4 /*yield*/, detectionBoxes.data()];
                    case 1:
                        detectionBoxesData = _a.sent();
                        return [4 /*yield*/, detectionScore.data()];
                    case 2:
                        detectionScoresData = _a.sent();
                        for (i = 0; i < config.numBoxes; ++i) {
                            if (config.minScoreThresh != null &&
                                detectionScoresData[i] < config.minScoreThresh) {
                                continue;
                            }
                            boxOffset = i * config.numCoords;
                            detection = convertToDetection(detectionBoxesData[boxOffset + 0] /* boxYMin */, detectionBoxesData[boxOffset + 1] /* boxXMin */, detectionBoxesData[boxOffset + 2] /* boxYMax */, detectionBoxesData[boxOffset + 3] /* boxXMax */, detectionScoresData[i], config.flipVertically, i);
                            bbox = detection.locationData.relativeBoundingBox;
                            if (bbox.width < 0 || bbox.height < 0) {
                                // Decoded detection boxes could have negative values for width/height
                                // due to model prediction. Filter out those boxes since some
                                // downstream calculators may assume non-negative values.
                                continue;
                            }
                            // Add keypoints.
                            if (config.numKeypoints > 0) {
                                locationData = detection.locationData;
                                locationData.relativeKeypoints = [];
                                totalIdx = config.numKeypoints * config.numValuesPerKeypoint;
                                for (kpId = 0; kpId < totalIdx; kpId += config.numValuesPerKeypoint) {
                                    keypointIndex = boxOffset + config.keypointCoordOffset + kpId;
                                    keypoint = {
                                        x: detectionBoxesData[keypointIndex + 0],
                                        y: config.flipVertically ? 1 - detectionBoxesData[keypointIndex + 1] :
                                            detectionBoxesData[keypointIndex + 1]
                                    };
                                    locationData.relativeKeypoints.push(keypoint);
                                }
                            }
                            outputDetections.push(detection);
                        }
                        return [2 /*return*/, outputDetections];
                }
            });
        });
    }
    function convertToDetection(boxYMin, boxXMin, boxYMax, boxXMax, score, flipVertically, i) {
        return {
            score: [score],
            ind: i,
            locationData: {
                relativeBoundingBox: {
                    xMin: boxXMin,
                    yMin: flipVertically ? 1 - boxYMax : boxYMin,
                    xMax: boxXMax,
                    yMax: flipVertically ? 1 - boxYMin : boxYMax,
                    width: boxXMax - boxXMin,
                    height: boxYMax - boxYMin
                }
            }
        };
    }
    //[xCenter, yCenter, w, h, kp1, kp2, kp3, kp4]
    //[yMin, xMin, yMax, xMax, kpX, kpY, kpX, kpY]
    function decodeBoxes(rawBoxes, anchor, config) {
        return tf.tidy(function () {
            var yCenter;
            var xCenter;
            var h;
            var w;
            if (config.reverseOutputOrder) {
                // Shape [numOfBoxes, 1].
                xCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 0], [-1, 1]));
                yCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 1], [-1, 1]));
                w = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 2], [-1, 1]));
                h = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 3], [-1, 1]));
            }
            else {
                yCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 0], [-1, 1]));
                xCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 1], [-1, 1]));
                h = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 2], [-1, 1]));
                w = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 3], [-1, 1]));
            }
            xCenter =
                tf.add(tf.mul(tf.div(xCenter, config.xScale), anchor.w), anchor.x);
            yCenter =
                tf.add(tf.mul(tf.div(yCenter, config.yScale), anchor.h), anchor.y);
            if (config.applyExponentialOnBoxSize) {
                h = tf.mul(tf.exp(tf.div(h, config.hScale)), anchor.h);
                w = tf.mul(tf.exp(tf.div(w, config.wScale)), anchor.w);
            }
            else {
                h = tf.mul(tf.div(h, config.hScale), anchor.h);
                w = tf.mul(tf.div(w, config.wScale), anchor.h);
            }
            var yMin = tf.sub(yCenter, tf.div(h, 2));
            var xMin = tf.sub(xCenter, tf.div(w, 2));
            var yMax = tf.add(yCenter, tf.div(h, 2));
            var xMax = tf.add(xCenter, tf.div(w, 2));
            // Shape [numOfBoxes, 4].
            var boxes = tf.concat([
                tf.reshape(yMin, [config.numBoxes, 1]),
                tf.reshape(xMin, [config.numBoxes, 1]),
                tf.reshape(yMax, [config.numBoxes, 1]),
                tf.reshape(xMax, [config.numBoxes, 1])
            ], 1);
            if (config.numKeypoints) {
                for (var k = 0; k < config.numKeypoints; ++k) {
                    var keypointOffset = config.keypointCoordOffset + k * config.numValuesPerKeypoint;
                    var keypointX = void 0;
                    var keypointY = void 0;
                    if (config.reverseOutputOrder) {
                        keypointX =
                            tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset], [-1, 1]));
                        keypointY =
                            tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset + 1], [-1, 1]));
                    }
                    else {
                        keypointY =
                            tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset], [-1, 1]));
                        keypointX =
                            tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset + 1], [-1, 1]));
                    }
                    var keypointXNormalized = tf.add(tf.mul(tf.div(keypointX, config.xScale), anchor.w), anchor.x);
                    var keypointYNormalized = tf.add(tf.mul(tf.div(keypointY, config.yScale), anchor.h), anchor.y);
                    boxes = tf.concat([
                        boxes, tf.reshape(keypointXNormalized, [config.numBoxes, 1]),
                        tf.reshape(keypointYNormalized, [config.numBoxes, 1])
                    ], 1);
                }
            }
            // Shape [numOfBoxes, 4] || [numOfBoxes, 12].
            return boxes;
        });
    }

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
    function sigmoid(value) {
        return 1 / (1 + Math.exp(-value));
    }

    function applyActivation(activation, value) {
        return activation === 'none' ? value : sigmoid(value);
    }
    /**
     * A calculator for converting Tensors from regression models into landmarks.
     * Note that if the landmarks in the tensor has more than 5 dimensions, only the
     * first 5 dimensions will be converted to [x,y,z, visibility, presence]. The
     * latter two fields may also stay unset if such attributes are not supported in
     * the model.
     * @param landmarkTensor List of Tensors of type float32. Only the first tensor
     * will be used. The size of the values must be (num_dimension x num_landmarks).
     * @param flipHorizontally Optional. Whether to flip landmarks horizontally or
     * not. Overrides corresponding field in config.
     * @param flipVertically Optional. Whether to flip landmarks vertically or not.
     * Overrides corresponding field in config.
     *
     * @param config
     *
     * @returns Normalized landmarks.
     */
    function tensorsToLandmarks(landmarkTensor, config, flipHorizontally, flipVertically) {
        return __awaiter(this, void 0, void 0, function () {
            var numValues, numDimensions, rawLandmarks, outputLandmarks, ld, offset, landmark, i, landmark;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        flipHorizontally = flipHorizontally || config.flipHorizontally || false;
                        flipVertically = flipVertically || config.flipVertically || false;
                        numValues = landmarkTensor.size;
                        numDimensions = numValues / config.numLandmarks;
                        return [4 /*yield*/, landmarkTensor.data()];
                    case 1:
                        rawLandmarks = _a.sent();
                        outputLandmarks = [];
                        for (ld = 0; ld < config.numLandmarks; ++ld) {
                            offset = ld * numDimensions;
                            landmark = { x: 0, y: 0 };
                            if (flipHorizontally) {
                                landmark.x = config.inputImageWidth - rawLandmarks[offset];
                            }
                            else {
                                landmark.x = rawLandmarks[offset];
                            }
                            if (numDimensions > 1) {
                                if (flipVertically) {
                                    landmark.y = config.inputImageHeight - rawLandmarks[offset + 1];
                                }
                                else {
                                    landmark.y = rawLandmarks[offset + 1];
                                }
                            }
                            if (numDimensions > 2) {
                                landmark.z = rawLandmarks[offset + 2];
                            }
                            if (numDimensions > 3) {
                                landmark.score = applyActivation(config.visibilityActivation, rawLandmarks[offset + 3]);
                            }
                            // presence is in rawLandmarks[offset + 4], we don't expose it.
                            outputLandmarks.push(landmark);
                        }
                        for (i = 0; i < outputLandmarks.length; ++i) {
                            landmark = outputLandmarks[i];
                            landmark.x = landmark.x / config.inputImageWidth;
                            landmark.y = landmark.y / config.inputImageHeight;
                            // Scale Z coordinate as X + allow additional uniform normalization.
                            landmark.z = landmark.z / config.inputImageWidth / (config.normalizeZ || 1);
                        }
                        return [2 /*return*/, outputLandmarks];
                }
            });
        });
    }

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
    /**
     * Performs geometric transformation to the input normalized rectangle,
     * correpsonding to input normalized rectangle respectively.
     * @param rect The normalized rectangle.
     * @param imageSize The original imageSize.
     * @param config See documentation in `RectTransformationConfig`.
     */
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/rect_transformation_calculator.cc
    function transformNormalizedRect(rect, imageSize, config) {
        var width = rect.width;
        var height = rect.height;
        var rotation = rect.rotation;
        if (config.rotation != null || config.rotationDegree != null) {
            rotation = computeNewRotation(rotation, config);
        }
        if (rotation === 0) {
            rect.xCenter = rect.xCenter + width * config.shiftX;
            rect.yCenter = rect.yCenter + height * config.shiftY;
        }
        else {
            var xShift = (imageSize.width * width * config.shiftX * Math.cos(rotation) -
                imageSize.height * height * config.shiftY * Math.sin(rotation)) /
                imageSize.width;
            var yShift = (imageSize.width * width * config.shiftX * Math.sin(rotation) +
                imageSize.height * height * config.shiftY * Math.cos(rotation)) /
                imageSize.height;
            rect.xCenter = rect.xCenter + xShift;
            rect.yCenter = rect.yCenter + yShift;
        }
        if (config.squareLong) {
            var longSide = Math.max(width * imageSize.width, height * imageSize.height);
            width = longSide / imageSize.width;
            height = longSide / imageSize.height;
        }
        else if (config.squareShort) {
            var shortSide = Math.min(width * imageSize.width, height * imageSize.height);
            width = shortSide / imageSize.width;
            height = shortSide / imageSize.height;
        }
        rect.width = width * config.scaleX;
        rect.height = height * config.scaleY;
        return rect;
    }
    function computeNewRotation(rotation, config) {
        if (config.rotation != null) {
            rotation += config.rotation;
        }
        else if (config.rotationDegree != null) {
            rotation += Math.PI * config.rotationDegree / 180;
        }
        return normalizeRadians(rotation);
    }

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
    var DEFAULT_DETECTOR_MODEL_URL_FULL_SPARSE = 'https://storage.googleapis.com/tfjs-testing/face-detection/face_detection_full_range_sparse/model.json';
    var DEFAULT_DETECTOR_MODEL_URL_SHORT = 'https://storage.googleapis.com/tfjs-testing/face-detection/face_detection_short_range/model.json';
    var DEFAULT_LANDMARK_MODEL_URL = 'https://storage.googleapis.com/tfjs-testing/face-detection/face_landmark/model.json';
    var DEFAULT_LANDMARK_MODEL_URL_WITH_ATTENTION = 'https://storage.googleapis.com/tfjs-testing/face-detection/face_landmark_with_attention/model.json';
    var SHORT_RANGE_DETECTOR_ANCHOR_CONFIG = {
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
    var FULL_RANGE_DETECTOR_ANCHOR_CONFIG = {
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
    var DEFAULT_FACE_DETECTOR_MODEL_CONFIG = {
        modelType: 'short',
        maxFaces: 1,
        detectorModelUrl: DEFAULT_DETECTOR_MODEL_URL_SHORT,
    };
    var DEFAULT_FACE_MESH_MODEL_CONFIG$1 = {
        runtime: 'tfjs',
        maxFaces: 1,
        refineLandmarks: false,
        detectorModelUrl: DEFAULT_DETECTOR_MODEL_URL_SHORT,
        landmarkModelUrl: DEFAULT_LANDMARK_MODEL_URL
    };
    var DEFAULT_FACE_MESH_ESTIMATION_CONFIG = {
        flipHorizontal: false,
        staticImageMode: false
    };
    var SHORT_RANGE_TENSORS_TO_DETECTION_CONFIG = {
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
    var FULL_RANGE_TENSORS_TO_DETECTION_CONFIG = {
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
    var DETECTOR_NON_MAX_SUPPRESSION_CONFIG = {
        overlapType: 'intersection-over-union',
        minSuppressionThreshold: 0.3
    };
    var RECT_TRANSFORMATION_CONFIG = {
        shiftX: 0,
        shiftY: 0,
        scaleX: 1.5,
        scaleY: 1.5,
        squareLong: true
    };
    var SHORT_RANGE_IMAGE_TO_TENSOR_CONFIG = {
        outputTensorSize: { width: 128, height: 128 },
        keepAspectRatio: true,
        outputTensorFloatRange: [-1, 1],
        borderMode: 'zero'
    };
    var FULL_RANGE_IMAGE_TO_TENSOR_CONFIG = {
        outputTensorSize: { width: 192, height: 192 },
        keepAspectRatio: true,
        outputTensorFloatRange: [-1, 1],
        borderMode: 'zero'
    };
    var LANDMARK_IMAGE_TO_TENSOR_CONFIG = {
        outputTensorSize: { width: 192, height: 192 },
        outputTensorFloatRange: [0, 1],
        borderMode: 'replicate'
    };
    var FACE_PRESENCE_SCORE = 0.5;
    var MIN_SIMILARITY_THRESHOLD = 0.5;
    var TENSORS_TO_LANDMARKS_MESH_CONFIG = {
        numLandmarks: 468,
        inputImageWidth: 192,
        inputImageHeight: 192,
        visibilityActivation: 'none',
        flipHorizontally: false,
        flipVertically: false
    };
    var TENSORS_TO_LANDMARKS_LIPS_CONFIG = {
        numLandmarks: 80,
        inputImageWidth: 192,
        inputImageHeight: 192,
        visibilityActivation: 'none',
        flipHorizontally: false,
        flipVertically: false
    };
    var TENSORS_TO_LANDMARKS_EYE_CONFIG = {
        numLandmarks: 71,
        inputImageWidth: 192,
        inputImageHeight: 192,
        visibilityActivation: 'none',
        flipHorizontally: false,
        flipVertically: false
    };
    var TENSORS_TO_LANDMARKS_IRIS_CONFIG = {
        numLandmarks: 5,
        inputImageWidth: 192,
        inputImageHeight: 192,
        visibilityActivation: 'none',
        flipHorizontally: false,
        flipVertically: false
    };
    var LANDMARKS_REFINEMENT_MESH_CONFIG = {
        indexesMapping: Array.from(Array(468).keys()),
        zRefinement: 'copy'
    };
    var LANDMARKS_REFINEMENT_LIPS_CONFIG = {
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
    var LANDMARKS_REFINEMENT_LEFT_EYE_CONFIG = {
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
    var LANDMARKS_REFINEMENT_RIGHT_EYE_CONFIG = {
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
    var LANDMARKS_REFINEMENT_LEFT_IRIS_CONFIG = {
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
    var LANDMARKS_REFINEMENT_RIGHT_IRIS_CONFIG = {
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
    function validateDetectorModelConfig(modelConfig) {
        if (modelConfig == null) {
            return __assign({}, DEFAULT_FACE_DETECTOR_MODEL_CONFIG);
        }
        var config = __assign({}, modelConfig);
        if (config.modelType == null) {
            config.modelType = DEFAULT_FACE_DETECTOR_MODEL_CONFIG.modelType;
        }
        if (config.maxFaces == null) {
            config.maxFaces = DEFAULT_FACE_DETECTOR_MODEL_CONFIG.maxFaces;
        }
        if (config.detectorModelUrl == null) {
            switch (config.modelType) {
                case 'full':
                    config.detectorModelUrl = DEFAULT_DETECTOR_MODEL_URL_FULL_SPARSE;
                    break;
                case 'short':
                default:
                    config.detectorModelUrl = DEFAULT_DETECTOR_MODEL_URL_SHORT;
                    break;
            }
        }
        return config;
    }
    function validateMeshModelConfig(modelConfig) {
        if (modelConfig == null) {
            return __assign({}, DEFAULT_FACE_MESH_MODEL_CONFIG$1);
        }
        var config = __assign({}, modelConfig);
        config.runtime = 'tfjs';
        if (config.maxFaces == null) {
            config.maxFaces = DEFAULT_FACE_MESH_MODEL_CONFIG$1.maxFaces;
        }
        if (config.refineLandmarks == null) {
            config.refineLandmarks = DEFAULT_FACE_MESH_MODEL_CONFIG$1.refineLandmarks;
        }
        if (config.detectorModelUrl == null) {
            config.detectorModelUrl = DEFAULT_DETECTOR_MODEL_URL_SHORT;
        }
        if (config.landmarkModelUrl == null) {
            config.landmarkModelUrl = config.refineLandmarks ?
                DEFAULT_LANDMARK_MODEL_URL_WITH_ATTENTION :
                DEFAULT_LANDMARK_MODEL_URL;
        }
        return config;
    }
    function validateEstimationConfig(estimationConfig) {
        if (estimationConfig == null) {
            return __assign({}, DEFAULT_FACE_MESH_ESTIMATION_CONFIG);
        }
        var config = __assign({}, estimationConfig);
        if (config.flipHorizontal == null) {
            config.flipHorizontal = DEFAULT_FACE_MESH_ESTIMATION_CONFIG.flipHorizontal;
        }
        if (config.staticImageMode == null) {
            config.staticImageMode =
                DEFAULT_FACE_MESH_ESTIMATION_CONFIG.staticImageMode;
        }
        return config;
    }

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
    var MediaPipeFaceDetectorTfjs = /** @class */ (function () {
        function MediaPipeFaceDetectorTfjs(detectorModelType, detectorModel, maxFaces) {
            this.detectorModel = detectorModel;
            this.maxFaces = maxFaces;
            if (detectorModelType === 'full') {
                this.imageToTensorConfig = FULL_RANGE_IMAGE_TO_TENSOR_CONFIG;
                this.tensorsToDetectionConfig =
                    FULL_RANGE_TENSORS_TO_DETECTION_CONFIG;
                this.anchors =
                    createSsdAnchors(FULL_RANGE_DETECTOR_ANCHOR_CONFIG);
            }
            else {
                this.imageToTensorConfig = SHORT_RANGE_IMAGE_TO_TENSOR_CONFIG;
                this.tensorsToDetectionConfig =
                    SHORT_RANGE_TENSORS_TO_DETECTION_CONFIG;
                this.anchors =
                    createSsdAnchors(SHORT_RANGE_DETECTOR_ANCHOR_CONFIG);
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
                                var imageTensor = tf.cast(toImageTensor(image), 'float32');
                                if (flipHorizontal) {
                                    var batchAxis = 0;
                                    imageTensor = tf.squeeze(tf.image.flipLeftRight(
                                    // tslint:disable-next-line: no-unnecessary-type-assertion
                                    tf.expandDims(imageTensor, batchAxis)), [batchAxis]);
                                }
                                return imageTensor;
                            });
                            _a = convertImageToTensor(image3d, this.imageToTensorConfig), inputTensors = _a.imageTensor, transformMatrix = _a.transformationMatrix;
                            detectionResult = this.detectorModel.execute(inputTensors, 'Identity:0');
                            _b = detectorResult(detectionResult), boxes = _b.boxes, logits = _b.logits;
                            return [4 /*yield*/, tensorsToDetections([logits, boxes], this.anchorTensor, this.tensorsToDetectionConfig)];
                        case 1:
                            unfilteredDetections = _c.sent();
                            if (unfilteredDetections.length === 0) {
                                tf.dispose([image3d, inputTensors, detectionResult, logits, boxes]);
                                return [2 /*return*/, unfilteredDetections];
                            }
                            return [4 /*yield*/, nonMaxSuppression(unfilteredDetections, this.maxFaces, DETECTOR_NON_MAX_SUPPRESSION_CONFIG.minSuppressionThreshold)];
                        case 2:
                            filteredDetections = _c.sent();
                            detections = 
                            // FaceDetectionShortRangeModelCpu:
                            // DetectionProjectionCalculator
                            detectionProjection(filteredDetections, transformMatrix);
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
                        config = validateDetectorModelConfig(modelConfig);
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
                            config = validateEstimationConfig(estimationConfig);
                            if (image == null) {
                                this.reset();
                                return [2 /*return*/, []];
                            }
                            imageSize = getImageSize(image);
                            image3d = tf.tidy(function () {
                                var imageTensor = tf.cast(toImageTensor(image), 'float32');
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
                            faceRects = calculateAssociationNormRect([faceRectsFromDetections, prevFaceRectsFromLandmarks || []], MIN_SIMILARITY_THRESHOLD);
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
                                keypoints = normalizedKeypointsToKeypoints(landmarks, imageSize);
                                // Add keypoint name.
                                if (keypoints != null) {
                                    keypoints.forEach(function (keypoint, i) {
                                        var name = MEDIAPIPE_KEYPOINTS.get(i);
                                        if (name != null) {
                                            keypoint.name = name;
                                        }
                                    });
                                }
                                detection = landmarksToDetection(keypoints);
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
            var rawRoi = calculateDetectionsToRects(detection, 'boundingbox', 'normRect', imageSize, {
                rotationVectorStartKeypointIndex: 0,
                rotationVectorEndKeypointIndex: 1,
                rotationVectorTargetAngleDegree: 0
            });
            // Expands and shifts the rectangle that contains the face so that it's
            // likely to cover the entire face.
            // FaceDetectionFrontDetectionToRoi: RectTransformationCalculation.
            var roi = transformNormalizedRect(rawRoi, imageSize, RECT_TRANSFORMATION_CONFIG);
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
                            inputTensors = convertImageToTensor(image, LANDMARK_IMAGE_TO_TENSOR_CONFIG, roi).imageTensor;
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
                            if (facePresenceScore < FACE_PRESENCE_SCORE) {
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
                            faceLandmarks = calculateLandmarkProjection(landmarks, roi);
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
                    return [2 /*return*/, tensorsToLandmarks(landmarkTensors[0], TENSORS_TO_LANDMARKS_MESH_CONFIG)];
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
                        case 0: return [4 /*yield*/, tensorsToLandmarks(landmarkTensors[0], TENSORS_TO_LANDMARKS_MESH_CONFIG)];
                        case 1:
                            meshLandmarks = _a.sent();
                            return [4 /*yield*/, tensorsToLandmarks(landmarkTensors[1], TENSORS_TO_LANDMARKS_LIPS_CONFIG)];
                        case 2:
                            lipsLandmarks = _a.sent();
                            return [4 /*yield*/, tensorsToLandmarks(landmarkTensors[3], TENSORS_TO_LANDMARKS_EYE_CONFIG)];
                        case 3:
                            leftEyeLandmarks = _a.sent();
                            return [4 /*yield*/, tensorsToLandmarks(landmarkTensors[5], TENSORS_TO_LANDMARKS_EYE_CONFIG)];
                        case 4:
                            rightEyeLandmarks = _a.sent();
                            return [4 /*yield*/, tensorsToLandmarks(landmarkTensors[4], TENSORS_TO_LANDMARKS_IRIS_CONFIG)];
                        case 5:
                            leftIrisLandmarks = _a.sent();
                            return [4 /*yield*/, tensorsToLandmarks(landmarkTensors[2], TENSORS_TO_LANDMARKS_IRIS_CONFIG)];
                        case 6:
                            rightIrisLandmarks = _a.sent();
                            return [2 /*return*/, landmarksRefinement([
                                    meshLandmarks, lipsLandmarks, leftEyeLandmarks, rightEyeLandmarks,
                                    leftIrisLandmarks, rightIrisLandmarks
                                ], [
                                    LANDMARKS_REFINEMENT_MESH_CONFIG,
                                    LANDMARKS_REFINEMENT_LIPS_CONFIG,
                                    LANDMARKS_REFINEMENT_LEFT_EYE_CONFIG,
                                    LANDMARKS_REFINEMENT_RIGHT_EYE_CONFIG,
                                    LANDMARKS_REFINEMENT_LEFT_IRIS_CONFIG,
                                    LANDMARKS_REFINEMENT_RIGHT_IRIS_CONFIG
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
            var faceDetection = landmarksToDetection(landmarks);
            // Converts the face detection into a rectangle (normalized by image size)
            // that encloses the face and is rotated such that the line connecting
            // left side of the left eye and right side of the right eye is aligned
            // with the X-axis of the rectangle.
            // FaceLandmarkLandmarksToRoi: DetectionsToRectsCalculator
            var faceRectFromLandmarks = calculateDetectionsToRects(faceDetection, 'boundingbox', 'normRect', imageSize, {
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
            var roi = transformNormalizedRect(faceRectFromLandmarks, imageSize, RECT_TRANSFORMATION_CONFIG);
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
                        config = validateMeshModelConfig(modelConfig);
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

    (function (SupportedModels) {
        SupportedModels["MediaPipeFaceMesh"] = "MediaPipeFaceMesh";
    })(exports.SupportedModels || (exports.SupportedModels = {}));

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
    /**
     * Create a face detector instance.
     *
     * @param model The name of the pipeline to load.
     * @param modelConfig The configuration for the pipeline to load.
     */
    function createDetector(model, modelConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var config, runtime;
            return __generator(this, function (_a) {
                switch (model) {
                    case exports.SupportedModels.MediaPipeFaceMesh:
                        config = modelConfig;
                        runtime = void 0;
                        if (config != null) {
                            if (config.runtime === 'tfjs') {
                                return [2 /*return*/, loadMeshModel(config)];
                            }
                            if (config.runtime === 'mediapipe') {
                                return [2 /*return*/, load(config)];
                            }
                            runtime = config.runtime;
                        }
                        throw new Error("Expect modelConfig.runtime to be either 'tfjs' " +
                            ("or 'mediapipe', but got " + runtime));
                    default:
                        throw new Error(model + " is not a supported model name.");
                }
            });
        });
    }

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
    function getKeypointIndexByContour(model) {
        switch (model) {
            case exports.SupportedModels.MediaPipeFaceMesh:
                return MEDIAPIPE_KEYPOINTS_BY_CONTOUR;
            default:
                throw new Error("Model " + model + " is not supported.");
        }
    }
    function getAdjacentPairs(model) {
        switch (model) {
            case exports.SupportedModels.MediaPipeFaceMesh:
                return MEDIAPIPE_CONNECTED_KEYPOINTS_PAIRS;
            default:
                throw new Error("Model " + model + " is not supported.");
        }
    }

    var util = /*#__PURE__*/Object.freeze({
        __proto__: null,
        getKeypointIndexByContour: getKeypointIndexByContour,
        getAdjacentPairs: getAdjacentPairs
    });

    exports.createDetector = createDetector;
    exports.util = util;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
