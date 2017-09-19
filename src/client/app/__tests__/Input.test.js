import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Input from '../Input.react';

it('should render', () => {
    const component = renderer.create(
        <Input selector="accountInput" text="submit account"
        />
    );
    // initial state
    let tree = component.toJSON();
    // compare to snapshot
    expect(tree).toMatchSnapshot();
})

it('className should match prop.className', () => {
    const component = renderer.create(
        <Input selector="accountInput" text="submit account"
        />
    );
    // initial state
    let tree = component.toJSON();
    // compare to snapshot
    expect(tree).toMatchSnapshot();
    // find input
    const inp = tree.children.filter(child => child.type === 'input')[0];
    expect(inp.props.className).toBe("accountInput input");
})