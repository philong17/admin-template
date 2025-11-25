import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

export const useArrayParamState = (key: string, defaultValue: string[] = []): [string[], (newValue: string[]) => void] => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentValue = useMemo(() => {
    const urlSearchParam = new URLSearchParams(location.search);
    const isKeyNotExist = urlSearchParam.get(key) === null;
    if (isKeyNotExist) return defaultValue;
    return urlSearchParam.getAll(key);
  }, [key, location.search, defaultValue]);

  const setParamState = useCallback(
    (newValue: string[]) => {
      if ([...newValue].sort().join('@') === [...currentValue].sort().join('@')) return;
      const urlSearchParam = new URLSearchParams(location.search);
      urlSearchParam.delete(key);
      newValue.forEach((value) => urlSearchParam.append(key, value));
      navigate({ search: urlSearchParam.toString() }, { replace: true });
    },
    [currentValue, key, location.search, navigate],
  );

  return [currentValue, setParamState];
};

export const useStringParamState = (key: string, defaultValue: string): [string, (newValue: string) => void] => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentValue = useMemo(() => {
    const urlSearchParam = new URLSearchParams(location.search);

    return urlSearchParam.get(key) ?? defaultValue;
  }, [key, location.search, defaultValue]);

  const setParamState = useCallback(
    (newValue: string | undefined) => {
      if (newValue === currentValue) return;
      const urlSearchParam = new URLSearchParams(location.search);
      urlSearchParam.set(key, newValue ?? '');
      navigate({ search: urlSearchParam.toString() }, { replace: true });
    },
    [currentValue, key, location.search, navigate],
  );

  return [currentValue ?? '', setParamState];
};

type BatchUpdateParamStateItem = {
  key: string;
  newValue: string | string[];
};

export const useBatchUpdateParamState = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (inputs: BatchUpdateParamStateItem[]) => {
      const urlSearchParam = new URLSearchParams(location.search);
      inputs.forEach((input) => {
        if (typeof input.newValue === 'string') {
          urlSearchParam.set(input.key, input.newValue);
        } else {
          urlSearchParam.delete(input.key);
          input.newValue.forEach((item) => urlSearchParam.append(input.key, item));
        }
      });
      navigate({ search: urlSearchParam.toString() }, { replace: true });
    },
    [location.search, navigate],
  );
};

interface GetStringParamsStateInput {
  key: string;
  defaultValue: string;
}

export const useGetStringParamsState = (inputs: GetStringParamsStateInput[]) => {
  const location = useLocation();
  const urlSearchParam = new URLSearchParams(location.search);

  return inputs.map((input) => urlSearchParam.get(input.key) ?? input.defaultValue);
};

interface GetArrayParamsStateInput {
  key: string;
  defaultValue: string[];
}

export const useGetArrayParamsState = (inputs: GetArrayParamsStateInput[]) => {
  const location = useLocation();
  const urlSearchParam = new URLSearchParams(location.search);

  return inputs.map((input) => urlSearchParam.getAll(input.key) ?? input.defaultValue);
};
