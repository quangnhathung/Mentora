import React from 'react';

import { Checkbox, Input, Radio, Switch, View } from '@/shared/ui';
import { type ChoiceBase } from '@/shared/ui/List/SelectableList';
import { Select } from '@/shared/ui/select';

import { Title } from './title';

const options: ChoiceBase[] = [
  { id: 1, value: 'chocolate', description: 'Chocolate' },
  { id: 2, value: 'strawberry', description: 'Strawberry' },
  { id: 3, value: 'vanilla', description: 'Vanilla' },
];

export const Inputs = () => {
  const [value, setValue] = React.useState<string | number | undefined>();
  return (
    <>
      <Title text="Form" />
      <View>
        <Input label="Default" placeholder="Lorem ipsum dolor sit amet" />
        <Input label="Error" error="This is a message error" />
        <Input label="Focused" />
        <Select
          label="Select"
          options={options}
          value={value}
          onSelect={(option) => setValue(option.id)}
        />
        <CheckboxExample />
        <RadioExample />
        <SwitchExample />
      </View>
    </>
  );
};

const CheckboxExample = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox.Root
      checked={checked}
      onChange={setChecked}
      accessibilityLabel="accept terms of condition"
      className="pb-2"
    >
      <Checkbox.Icon checked={checked} />
      <Checkbox.Label text="checkbox" />
    </Checkbox.Root>
  );
};

const RadioExample = () => {
  const [selected, setSelected] = React.useState(false);
  return (
    <Radio.Root
      checked={selected}
      onChange={setSelected}
      accessibilityLabel="radio button"
      className="pb-2"
    >
      <Radio.Icon checked={selected} />
      <Radio.Label text="radio button" />
    </Radio.Root>
  );
};

const SwitchExample = () => {
  const [active, setActive] = React.useState(false);
  return (
    <Switch.Root
      checked={active}
      onChange={setActive}
      accessibilityLabel="switch"
      className="pb-2"
    >
      <Switch.Icon checked={active} />
      <Switch.Label text="switch" />
    </Switch.Root>
  );
};
