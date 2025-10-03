// Original file: proto/department.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { Response as _department_Response, Response__Output as _department_Response__Output } from '../department/Response';

export interface DepartmentsClient extends grpc.Client {
  GetAll(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_department_Response__Output>): grpc.ClientUnaryCall;
  GetAll(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_department_Response__Output>): grpc.ClientUnaryCall;
  GetAll(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_department_Response__Output>): grpc.ClientUnaryCall;
  GetAll(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_department_Response__Output>): grpc.ClientUnaryCall;
  getAll(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_department_Response__Output>): grpc.ClientUnaryCall;
  getAll(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_department_Response__Output>): grpc.ClientUnaryCall;
  getAll(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_department_Response__Output>): grpc.ClientUnaryCall;
  getAll(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_department_Response__Output>): grpc.ClientUnaryCall;
  
}

export interface DepartmentsHandlers extends grpc.UntypedServiceImplementation {
  GetAll: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _department_Response>;
  
}

export interface DepartmentsDefinition extends grpc.ServiceDefinition {
  GetAll: MethodDefinition<_google_protobuf_Empty, _department_Response, _google_protobuf_Empty__Output, _department_Response__Output>
}
