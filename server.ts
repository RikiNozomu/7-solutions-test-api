import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import type { ProtoGrpcType } from "./proto/department.ts";
import type { DepartmentsHandlers } from "./proto/department/Departments.ts";
import type { Empty } from "./proto/google/protobuf/Empty.ts";
import type { Response as ResponseData } from "./proto/department/Response.ts";
import { convertData, getDataFromDummy } from "./service.ts";

const host = "0.0.0.0:9090";

const DepartmentsHandler: DepartmentsHandlers = {
  async GetAll(
    _call: grpc.ServerUnaryCall<Empty, ResponseData>,
    callback: grpc.sendUnaryData<ResponseData>
  ) {
    try {
      const data = await getDataFromDummy().then( users => convertData(users.users) )
      const testResponse: ResponseData = {
        result: data.reduce((acc, cur) => {
          return {
            ...acc,
            [cur.name]: {
              male: cur.male,
              female: cur.female,
              hair: cur.hair,
              addressUser: cur.addressUser,
              ageRange: `${cur.lowerAge}-${cur.upperAge}`,
            },
          };
        }, {}),
      };

      callback(null, testResponse);
    } catch (error:Event | unknown) {
      callback({
        code: grpc.status.INTERNAL,
        details: error instanceof Error ? error.message : "Something went wrong.",
      });
    }
  },
};

function getServer(): grpc.Server {
  const packageDefinition = protoLoader.loadSync("./proto/department.proto");
  const proto = grpc.loadPackageDefinition(
    packageDefinition
  ) as unknown as ProtoGrpcType;
  const server = new grpc.Server();
  server.addService(proto.department.Departments.service, DepartmentsHandler);
  return server;
}

if (import.meta.main) {
  const server = getServer();
  server.bindAsync(
    host,
    grpc.ServerCredentials.createInsecure(),
    (err: Error | null, port: number) => {
      if (err) {
        console.error(`Server error: ${err.message}`);
      } else {
        console.log(`Server bound on port: ${port}`);
      }
    }
  );
}
