import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import type { ProtoGrpcType } from "./proto/department.ts";
import type { DepartmentsHandlers } from "./proto/department/Departments.ts";
import type { Empty } from "./proto/google/protobuf/Empty.ts";
import type { Response as ResponseData } from "./proto/department/Response.ts";
import type { DepartmentArr, User } from "./types.ts";

const host = "0.0.0.0:9090";

const DepartmentsHandler: DepartmentsHandlers = {
  async GetAll(
    _call: grpc.ServerUnaryCall<Empty, ResponseData>,
    callback: grpc.sendUnaryData<ResponseData>
  ) {
    const res = await fetch("https://dummyjson.com/users").catch((err) => {
      callback({
        code: grpc.status.INTERNAL,
        details: "JSON data is not ready.",
      });
    });

    const data = (await res!.json()) as { users: User[] };

    const resultArray = data.users.reduce<DepartmentArr[]>((acc, cur) => {
      const index = acc.findIndex(
        (item) => item.name == cur.company.department
      );

      if (index >= 0) {
        acc[index] = {
          ...acc[index],
          upperAge: cur.age > acc[index].upperAge ? cur.age : acc[index].upperAge,
          lowerAge:
            cur.age < acc[index].lowerAge ? cur.age : acc[index].lowerAge,
          ...(cur.gender == "male"
            ? { male: (acc[index].male || 0) + 1 }
            : { female: (acc[index].female || 0) + 1 }),
          addressUser: {
            ...acc[index].addressUser,
            [`${cur.firstName}${cur.lastName}`]: cur.address.postalCode,
          },
          hair: {
            ...acc[index].hair,
            [cur.hair.color]: (acc[index].hair![cur.hair.color] || 0) + 1,
          },
        };
        return acc;
      } else {
        acc.push({
          name: cur.company.department,
          lowerAge: cur.age,
          upperAge: cur.age,
          male: cur.gender == "male" ? 1 : 0,
          female: cur.gender == "female" ? 1 : 0,
          hair: {
            [cur.hair.color]: 1,
          },
          addressUser: {
            [`${cur.firstName}${cur.lastName}`]: cur.address.postalCode,
          },
        });
      }
      return acc;
    }, []);

    const testResponse: ResponseData = {
      result: resultArray.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.name] : {
            male : cur.male,
            female : cur.female,
            hair : cur.hair,
            addressUser : cur.addressUser,
            ageRange : `${cur.lowerAge}-${cur.upperAge}`
          }
        }
      }, {})
    };

    callback(null, testResponse);
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