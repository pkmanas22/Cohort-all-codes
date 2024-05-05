
export const DropDown = ({ listItems, onSelect }: {
  listItems: { number: string, name?: string }[],
  onSelect: (number: string) => void
}) => {
  return (
    <div>
      {listItems.map((value, index) => {
        return (
          <div key={index} onClick={() => onSelect(value.number)} className="cursor-pointer text-green-600 font-semibold">
            {value.number} - {value.name || ""}
          </div>
        );
      })}
    </div>
  );
};
