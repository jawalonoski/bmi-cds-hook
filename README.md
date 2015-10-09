# bmi-cds-hook

Demonstration of implementing a SMART-on-FHIR [`$cds-hook`](https://github.com/jmandel/cds-hooks/wiki)
using an AWS Lambda function.

## Requirements & Assumptions

The pre-fetch template for this hook requires `Observation` resources
with `loinc` codes `8302-2` (body height, centimeters or inches) and `3141-9`
(body weight measured, kilograms or pounds). No terminology or unit
translation services are used or assumed.

## Running in Node.js

* Start the Server

      node server.js

* Post the contents of `sample.request.json` to `http://localhost:3001`

      curl -i -X POST -d @sample.request.json http://localhost:3001

## Demonstration on AWS Lambda

      curl -i -X POST -d @sample.request.json https://o33vjt5ak2.execute-api.us-east-1.amazonaws.com/prod/bmi-cds-hook

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this software except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
