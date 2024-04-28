export const TextInput = ({ id, label, placeholder, onChange }: {
  id: string,
  label: string,
  placeholder: string,
  onChange: (value: string) => void,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>

      <input
        onChange={(e) => onChange(e.target.value)}
        type="text"
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder} />
    </div>
  );
};
