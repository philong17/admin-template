import React, { JSX } from 'react';

export interface SideBarGroupItemType {
  title: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  groupPath: string;
  items: Omit<SideBarItemType, 'Icon'>[];
}
export interface SideBarItemType {
  title: string;
  href: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}
export interface SideBarGroupType {
  label: string;
  items: (SideBarGroupItemType | SideBarItemType)[];
}

export interface TabType {
  label: string;
  value: string;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export interface ChipType {
  label: string;
  value: string;
}

export type HoursPreferenceType = {
  date: string;
  start: string;
  end: string;
};

export type LocationType = Record<string, { name: string; wards: string[] }>;

export interface IWard {
  name: string;
  code: string;
  type: string;
  typename: string;
  fullname: string;
}

export interface IProvince {
  name: string;
  code: string;
  type: string;
  typename: string;
  fullname: string;
  wards: IWard[];
}

export interface IVietnamLocationsData {
  provinces: IProvince[];
}
