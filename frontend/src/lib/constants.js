import slugify from 'slugify';
import { pathnames } from './pathnames';

export const postSoldTypes = [
  'Bán căn hộ chung cư',
  'Bán nhà mặt phố',
  'Bán nhà riêng',
  'Bán shophouse, nhà phố thương mại',
  'Bán biệt thự',
  'Bán đất nền dự án',
  'Bán đất',
  'Bán trang trại',
  'Bán khu nghỉ dưỡng',
  'Bán kho',
  'Bán nhà xưởng',
  'Bán loại bất động sản khác',
].map((element) => ({ name: element, pathname: slugify(element, { lower: true, strict: true }) }));

export const postRentTypes = [
  'Cho thuê căn hộ chung cư',
  'Cho thuê nhà mặt phố',
  'Cho thuê nhà riêng',
  'Cho thuê shophouse, nhà phố thương mại',
  'Cho thuê biệt thự',
  'Cho thuê nhà trọ, phòng trọ',
  'Cho thuê văn phòng',
  'Cho thuê trang trại',
  'Cho thuê khu nghỉ dưỡng',
  'Cho thuê kho, nhà xưởng, đất',
  'Cho thuê loại bất động sản khác',
].map((element) => ({ name: element, pathname: slugify(element, { lower: true, strict: true }) }));

export const navigationLinks = [
  {
    id: 1,
    name: 'Nhà đất bán',
    pathName: pathnames.publics.soldProperty,
    hasSub: true,
    subs: postSoldTypes,
  },
  {
    id: 2,
    name: 'Nhà đất cho thuê',
    pathName: pathnames.publics.rentProperty,
    hasSub: true,
    subs: postRentTypes,
  },
  {
    id: 3,
    name: 'Tin tức',
    pathName: pathnames.publics.news,
    hasSub: false,
  },
];
