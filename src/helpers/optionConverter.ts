interface props<T> {
  data: T[];
  labelName?: string | 'name';
  valueName?: string | 'id';
}

export const OptionConverter = <T extends Record<string, any>>({
  data,
  labelName = 'name',
  valueName = 'id'
}: props<T>): Array<{
  key: number;
  label: string;
  value: string;
}> => {
  return data.map((value, index) => {
    return {
      key: index,
      label: value[labelName],
      value: value[valueName]
    };
  });
};
