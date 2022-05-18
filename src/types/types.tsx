export interface TypeRes {
  result: true;
  message?: '查询成功';
  data?: any;
  talen?: string;
}

export interface TypeTag {
  tag: string;
  level?: string;
  description?: string;
  state?: string;
}

export interface TypeImage {
  hid: string;
  uid: string;
  title: string;
  href: string;
  description: string;
  width: number;
  height: number;
  type: string;
  coloe: string;
  trailnum: number;
  likenum: number;
  score: number;
  state: string;
  updatetime: string;
  createtime: string;
}

export interface TypeUser {
  uid: string;
  name: string;
  gender: string;
  email: string;
  role: string;
  head: string;
  introduction: string;
  createtime: string;
  updatetime: string;
}
export interface TypeRecord {
  uid: string;
  hid: string;
  type: string;
  createtime: string;
}

export interface TypeImageInfo {
  image: TypeImage;
  user?: TypeUser;
  tags?: TypeTag[];
  record?: TypeRecord;
}
export interface TypeImageRank {
  image: TypeImage;
  rank: number;
  record?: TypeRecord;
}

export interface TypeImageRecom {
  image: TypeImage;
  record?: TypeRecord;
  recommend?: number;
  belongTag?: string;
  type: string;
}
export interface TypeImageCard {
  image: TypeImage;
  user?: TypeUser;
  tags?: TypeTag[];
}
