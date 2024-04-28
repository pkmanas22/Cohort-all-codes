export const Select = ({ options, onSelect }: {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: String;
  }[];
}) => {

  return (
    <select
      onChange={(e) => {
        onSelect(e.target.value)
      }}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      {options.map(each =>
        <option value={each.key}>{each.value}</option>
      )}
    </select>
  );
};
