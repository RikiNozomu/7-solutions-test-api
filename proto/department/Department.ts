// Original file: proto/department.proto


export interface Department {
  'male'?: (number);
  'female'?: (number);
  'ageRange'?: (string);
  'hair'?: ({[key: string]: number});
  'addressUser'?: ({[key: string]: string});
}

export interface Department__Output {
  'male': (number);
  'female': (number);
  'ageRange': (string);
  'hair': ({[key: string]: number});
  'addressUser': ({[key: string]: string});
}
