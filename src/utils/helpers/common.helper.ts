import dayjs from '@/config/dayjs';
import { USER_ROLE } from '@/services/auth/auth.response';
import { DATE_FORMATS } from '../constants/dateFormat.constant';

// Convert a JS Date (picked by user) to an ISO string representing
// the same wall-clock time in Vietnam timezone (Asia/Ho_Chi_Minh).
// This avoids double/incorrect shifts when user's system timezone differs.
export const toVietnamISOString = (date: Date | string): string => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  const localWallTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return dayjs.tz(localWallTime, 'YYYY-MM-DD HH:mm:ss', 'Asia/Ho_Chi_Minh').toISOString();
};

export const formatMoney = (value: number | string): string => {
  const numericValue = Number(value);
  if (isNaN(numericValue)) {
    return '';
  }
  return numericValue.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  });
};

export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  const cleanedPhone = phone.trim().replace(/\D/g, '');
  return cleanedPhone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
};

export const safeString = (value: string | null | undefined): string => {
  if (!value) {
    return 'Chưa xác định';
  }
  return value.trim();
};

export const formatDate = (date: Date | string, format: string = DATE_FORMATS.DATE): string => {
  return dayjs(date).tz('Asia/Ho_Chi_Minh').format(format);
};

export const formatDateTime = (date: Date | string, format: string = DATE_FORMATS.DATE_TIME): string => {
  return dayjs(date).tz('Asia/Ho_Chi_Minh').format(format);
};

export const formatDateTimeVN = (date: Date | string): string => {
  return dayjs(date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm');
};

export const formatDateVN = (date: Date | string): string => {
  return dayjs(date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY');
};

export const remainTime = (expiryTime: string): string => {
  const now = dayjs();
  const expiry = dayjs(expiryTime);
  const duration = dayjs.duration(expiry.diff(now));

  if (duration.asMilliseconds() <= 0) {
    return 'Hết hạn';
  }

  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return `${hours} giờ ${minutes} phút ${seconds} giây`;
};

export const splitAddress = (
  address: string | null,
  location_code: string | null,
): { no: string; street: string; city: string; district: string } => {
  if (!address || !location_code) {
    return { no: '', street: '', city: '', district: '' };
  }
  const addressSplited = address.split(',');
  const [provinceCode, wardCode] = location_code.split('-');
  return {
    no: addressSplited.length >= 1 ? addressSplited[0]?.trim() || '' : '',
    street: addressSplited.length >= 2 ? addressSplited[1]?.trim() || '' : '',
    district: wardCode || '',
    city: provinceCode || '',
  };
};

export const dateInWeekMapper = (date: string): string => {
  switch (date.toLowerCase()) {
    case 'monday':
    case 'mon':
      return 'Thứ 2';
    case 'tuesday':
    case 'tue':
      return 'Thứ 3';
    case 'wednesday':
    case 'wed':
      return 'Thứ 4';
    case 'thursday':
    case 'thu':
      return 'Thứ 5';
    case 'friday':
    case 'fri':
      return 'Thứ 6';
    case 'saturday':
    case 'sat':
      return 'Thứ 7';
    case 'sunday':
    case 'sun':
      return 'Chủ nhật';
    default:
      throw new Error(`Unknown day: ${date}`);
  }
};

export const userRoleMapper: Record<USER_ROLE, string> = {
  [USER_ROLE.ADMIN]: 'Admin',
  [USER_ROLE.USER]: 'User',
};
