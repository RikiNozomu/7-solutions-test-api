import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import type { ProtoGrpcType } from "./proto/department.ts";
import type { Response as ResponseData } from "./proto/department/Response.ts";
import type { Empty } from "./proto/google/protobuf/Empty.ts";

const port = process.env.PORT || 9090;

const host = `0.0.0.0:${port}`;
const packageDefinition = protoLoader.loadSync("./proto/department.proto");
const proto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const client = new proto.department.Departments(
  host,
  grpc.credentials.createInsecure()
);

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (error?: Error) => {
  if (error) {
    console.log(`Client connect error: ${error.message}`);
  } else {
    client.GetAll(
      undefined as unknown as Empty,
      (error?: grpc.ServiceError | null, rep?: ResponseData) => {
        if (error) {
          console.error(error.message);
        } else if (rep) {
          console.log(`(client) Got server message:`);
          console.log(JSON.stringify(rep));
        }
      }
    );
  }
});
