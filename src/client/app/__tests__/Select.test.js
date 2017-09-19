import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Select from '../Select.react';

it('should render with props passed', () => {
    const arr = [
        <option key="one" value="one">"one"</option>,
        <option key="two" value="two">"two"</option>
    ];
    const tree = renderer.create(
        <Select val="one"
         selector="acctSelect"
         prompt="select an account"
         options={arr}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
})

it('should render children: options', () => {
    const arr = [
        <option key="one" value="one">"one"</option>,
        <option key="two" value="two">"two"</option>
    ];
    const handleChange = (e) => e.target.value;
    const component = renderer.create(
        <Select val="one"
         selector="acctSelect"
         prompt="select an account"
         options={arr}
         onSelectChange={handleChange}
        />
    );
    // initial state
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // find the select
    const sel = tree.children.filter(child => child.type === 'select')[0];
    // find children: options
    const opts = sel.children.filter(child => child.type === 'option');
    // assertions
    expect(opts.length).toBe(2);
    expect(tree).toMatchSnapshot();
    // test values
    expect(opts[0].props.value).toBe("one");
    expect(opts[1].props.value).toBe("two");
})