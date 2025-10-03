import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { Address as _department_Address, Address__Output as _department_Address__Output } from './department/Address';
import type { Department as _department_Department, Department__Output as _department_Department__Output } from './department/Department';
import type { DepartmentsClient as _department_DepartmentsClient, DepartmentsDefinition as _department_DepartmentsDefinition } from './department/Departments';
import type { Hair as _department_Hair, Hair__Output as _department_Hair__Output } from './department/Hair';
import type { Response as _department_Response, Response__Output as _department_Response__Output } from './department/Response';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from './google/protobuf/Empty';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  department: {
    Address: MessageTypeDefinition<_department_Address, _department_Address__Output>
    Department: MessageTypeDefinition<_department_Department, _department_Department__Output>
    Departments: SubtypeConstructor<typeof grpc.Client, _department_DepartmentsClient> & { service: _department_DepartmentsDefinition }
    Hair: MessageTypeDefinition<_department_Hair, _department_Hair__Output>
    Response: MessageTypeDefinition<_department_Response, _department_Response__Output>
  }
  google: {
    protobuf: {
      Empty: MessageTypeDefinition<_google_protobuf_Empty, _google_protobuf_Empty__Output>
    }
  }
}

