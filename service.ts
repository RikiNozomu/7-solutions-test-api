import type { DepartmentArr, User } from "./types.ts";

export async function getDataFromDummy() {
  const res = await fetch("https://dummyjson.com/users").catch((err) => {
    throw new Error("JSON data is not ready.");
  });
  return (await res.json()) as { users: User[] };
}

export function convertData(users: User[]) {
  return users.reduce<DepartmentArr[]>((acc, cur) => {
    const index = acc.findIndex((item) => item.name == cur.company.department);

    if (index >= 0) {
      acc[index] = {
        ...acc[index],
        upperAge: cur.age > acc[index].upperAge ? cur.age : acc[index].upperAge,
        lowerAge: cur.age < acc[index].lowerAge ? cur.age : acc[index].lowerAge,
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
}
