import { FilterKeys, SortOrderEnums } from '../enums/common.enum';

export interface PagingREQ {
  [FilterKeys.PAGE]?: number;
  [FilterKeys.LIMIT]?: number;
  [FilterKeys.SORT_BY]?: string;
  [FilterKeys.SORT_ORDER]?: SortOrderEnums;
}
