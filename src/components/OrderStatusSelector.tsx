// to test this, need diff test cases for testing rendering and ui
// rendering: make sure dropdown list has 3 items and new is selected by default
//

import { Select } from "@radix-ui/themes";

interface Props {
  onChange: (status: string) => void;
}
// onChange property is a fxn that takes str parameter named status and returns void

const OrderStatusSelector = ({ onChange }: Props) => {
  return (
    <Select.Root defaultValue="new" onValueChange={onChange}>
      {/* Select.Root is main container component for select dropdown provided by the radix ui library */}
      {/* defaultValue="new" property sets default selected value of dropdown to "new" when component is initially rendered */}
      {/* onValueChange={onChange} property attaches event handler to the select component that is called whenever the selected value changes. onValueChange expects a fxn that receives the new (not to be confused with "new" value in the defaultValue) value as an arg. onChange fxn is then passed as a prop to the OrderStatusSelector component */}
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          <Select.Item value="new">New</Select.Item>
          <Select.Item value="processed">Processed</Select.Item>
          <Select.Item value="fulfilled">Fulfilled</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default OrderStatusSelector;
