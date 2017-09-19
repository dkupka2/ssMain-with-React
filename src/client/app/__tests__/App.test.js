import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import App from '../App';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('should match snapshot', () => {
    const tree = renderer.create(
        <App />
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

it('updates input value on change when value is a number in range', () => {
    const app = renderer.create(<App />);
    let tree = app.toJSON();
    // find child
    const selectDiv1 = tree.children.filter(child => child.type === 'div')[0];
    // find select
    const input1 = selectDiv1.children.filter(child => child.type === 'input')[0];
    expect(tree).toMatchSnapshot();
    let fakeEvent = {target: {value: "1"}}
    input1.props.onChange(fakeEvent);
    // re cache after changes
    tree = app.toJSON();
    expect(tree).toMatchSnapshot();
    const selectDiv2 = tree.children.filter(child => child.type === 'div')[0];
    const input2 = selectDiv2.children.filter(child => child.type === 'input')[0];
    expect(input2.props.value).toBe("1");
})

it('does not update input value on change when value is NaN', () => {
    const app = renderer.create(<App />);
    let tree = app.toJSON();
    // find child
    const selectDiv1 = tree.children.filter(child => child.type === 'div')[0];
    // find select
    const input1 = selectDiv1.children.filter(child => child.type === 'input')[0];
    expect(tree).toMatchSnapshot();
    // fake events
    let fakeEvent1 = {target: {value: "1"} }
    input1.props.onChange(fakeEvent1);
    let fakeEvent2 = {target: {value: "1x"} }
    input1.props.onChange(fakeEvent2);
    // recache
    tree = app.toJSON();
    expect(tree).toMatchSnapshot();
    const selectDiv2 = tree.children.filter(child => child.type === 'div')[0];
    const input2 = selectDiv2.children.filter(child => child.type === 'input')[0];
    expect(input2.props.value).toBe("1");
})

it('submits values in range and adds to select options', () => {
    const app = renderer.create(<App />);
    let tree = app.toJSON();
    // find child
    const selectDiv1 = tree.children.filter(child => child.type === 'div')[0];
    const selectDiv2 = tree.children.filter(child => child.type === 'div')[1];
    // find select
    const input1 = selectDiv1.children.filter(child => child.type === 'input')[0];
    const button1 = selectDiv1.children.filter(child => child.type === 'button')[0];
    expect(tree).toMatchSnapshot();
    // fake events
    let fakeEvent1 = {target: {value: "1"} }
    let fakeEvent2 = {target: {value: "2"} }
    input1.props.onChange(fakeEvent1);
    button1.props.onClick();
    input1.props.onChange(fakeEvent2);
    button1.props.onClick();
    tree = app.toJSON();
    expect(tree).toMatchSnapshot();
    const selectDiv3 = tree.children.filter(child => child.type === 'div')[1];
    const sel = selectDiv3.children.filter(child => child.type === 'select')[0];
    const child1 = sel.children.filter(child => child.type === 'option')[0];
    const child2 = sel.children.filter(child => child.type === 'option')[1];
    expect(child1.props.value).toBe("1");
    expect(child2.props.value).toBe("2");
})

it('does not submit a value that is out of range', () => {
    const app = renderer.create(<App />);
    let tree = app.toJSON();
    // find child
    const selectDiv1 = tree.children.filter(child => child.type === 'div')[0];
    const selectDiv2 = tree.children.filter(child => child.type === 'div')[1];
    // find select
    const input1 = selectDiv1.children.filter(child => child.type === 'input')[0];
    const button1 = selectDiv1.children.filter(child => child.type === 'button')[0];
    expect(tree).toMatchSnapshot();
    // fake events
    let fakeEvent1 = {target: {value: "0"} }
    let fakeEvent2 = {target: {value: "1"} }
    input1.props.onChange(fakeEvent1);
    button1.props.onClick();
    input1.props.onChange(fakeEvent2);
    button1.props.onClick();
    tree = app.toJSON();
    expect(tree).toMatchSnapshot();
    const selectDiv3 = tree.children.filter(child => child.type === 'div')[1];
    const sel = selectDiv3.children.filter(child => child.type === 'select')[0];
    const child = sel.children.filter(child => child.type === 'option')[0];
    expect(child.props.value).toBe("1");
})

it('changes selected value when select option is changed', () => {
    const app = renderer.create(<App />);
    let tree = app.toJSON();
    // find child
    const selectDiv1 = tree.children.filter(child => child.type === 'div')[0];
    const selectDiv2 = tree.children.filter(child => child.type === 'div')[1];
    // find select
    const input1 = selectDiv1.children.filter(child => child.type === 'input')[0];
    const button1 = selectDiv1.children.filter(child => child.type === 'button')[0];
    expect(tree).toMatchSnapshot();
    // fake events
    let fakeEvent1 = {target: {value: "1"} }
    let fakeEvent2 = {target: {value: "2"} }
    input1.props.onChange(fakeEvent1);
    button1.props.onClick();
    input1.props.onChange(fakeEvent2);
    button1.props.onClick();
    tree = app.toJSON();
    expect(tree).toMatchSnapshot();
    const selectDiv1_2 = tree.children.filter(child => child.type === 'div')[1];
    let sel = selectDiv1_2.children.filter(child => child.type === 'select')[0];
    const options = sel.children.filter(child => child.type === 'option');
    sel.props.onChange(fakeEvent1);
    tree = app.toJSON();
    expect(tree).toMatchSnapshot();
    let selectDiv1_3 = tree.children.filter(child => child.type === 'div')[1];
    sel = selectDiv1_3.children.filter(child => child.type === 'select')[0];
    expect(sel.props.value).toBe("1");
    sel.props.onChange(fakeEvent2);
    tree = app.toJSON();
    expect(tree).toMatchSnapshot();
    selectDiv1_3 = tree.children.filter(child => child.type === 'div')[1];
    sel = selectDiv1_3.children.filter(child => child.type === 'select')[0];
    expect(sel.props.value).toBe("2");
})