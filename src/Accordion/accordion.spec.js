// @flow

import React, { Component } from 'react';
import renderer from 'react-test-renderer';

import Accordion from './accordion';
import AccordionItem from '../AccordionItem/accordion-item';
import AccordionItemTitle from '../AccordionItemTitle/accordion-item-title';
import AccordionItemBody from '../AccordionItemBody/accordion-item-body';

jest.mock('../AccordionItem/accordion-item', () => 'div');
jest.mock('../AccordionItemTitle/accordion-item-title', () => 'div');
jest.mock('../AccordionItemBody/accordion-item-body', () => 'div');

describe('Accordion', () => {
    it('renders correctly with min params', () => {
        const tree = renderer
            .create(
                <Accordion>
                    <AccordionItem>Fake child</AccordionItem>
                    <AccordionItem>Fake child</AccordionItem>
                </Accordion>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with accordion false', () => {
        const tree = renderer
            .create(
                <Accordion accordion={false}>
                    <AccordionItem>Fake child</AccordionItem>
                    <AccordionItem>Fake child</AccordionItem>
                </Accordion>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('different className', () => {
        const tree = renderer
            .create(
                <Accordion accordion={false} className="testCSSClass">
                    <AccordionItem>Fake Child</AccordionItem>
                    <AccordionItem>Fake Child</AccordionItem>
                </Accordion>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('handleClick function accordion true', () => {
        const wrapper = renderer.create(
            <Accordion>
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        wrapper.getInstance().handleClick(1);
        expect(wrapper.getInstance().state.activeItems).toEqual([1]);
        expect(wrapper).toMatchSnapshot();

        wrapper.getInstance().handleClick(1);
        expect(wrapper.getInstance().state.activeItems).toEqual([]);
        expect(wrapper).toMatchSnapshot();
    });

    it('handleClick function accordion false', () => {
        const wrapper = renderer.create(
            <Accordion accordion={false}>
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        wrapper.getInstance().handleClick(1);
        expect(wrapper.getInstance().state.activeItems).toEqual([1]);
        expect(wrapper).toMatchSnapshot();

        wrapper.getInstance().handleClick(1);
        expect(wrapper.getInstance().state.activeItems).toEqual([]);
        expect(wrapper).toMatchSnapshot();

        wrapper.getInstance().handleClick(0);
        wrapper.getInstance().handleClick(1);
        expect(wrapper.getInstance().state.activeItems).toEqual([0, 1]);
        expect(wrapper).toMatchSnapshot();
    });

    it('handles disabled children', () => {
        const wrapper = renderer.create(
            <Accordion accordion={false}>
                <AccordionItem disabled={true}>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        wrapper.getInstance().handleClick(0);
        expect(wrapper).toMatchSnapshot();
    });

    it('pre expanded accordion', () => {
        const tree = renderer
            .create(
                <Accordion>
                    <AccordionItem expanded={true}>Fake Child</AccordionItem>
                    <AccordionItem>Fake Child</AccordionItem>
                </Accordion>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('works with multiple pre expanded accordion. Extra expands are just ignored.', () => {
        const tree = renderer
            .create(
                <Accordion>
                    <AccordionItem expanded={true}>Fake Child</AccordionItem>
                    <AccordionItem expanded={true}>Fake Child</AccordionItem>
                </Accordion>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('pre expanded accordion when accordion is false', () => {
        const tree = renderer
            .create(
                <Accordion accordion={false}>
                    <AccordionItem expanded={true}>Fake Child</AccordionItem>
                    <AccordionItem expanded={true}>Fake Child</AccordionItem>
                </Accordion>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('pre expand accordion via accordion props', () => {
        const tree = renderer
            .create(
                <Accordion activeItems={[0]}>
                    <AccordionItem>Fake Child</AccordionItem>
                    <AccordionItem>Fake Child</AccordionItem>
                </Accordion>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('pre expand accordion via accordion props vs accordion item props. Expanded only second item.', () => {
        const tree = renderer
            .create(
                <Accordion activeItems={[0]}>
                    <AccordionItem>Fake Child</AccordionItem>
                    <AccordionItem expanded={true}>Fake Child</AccordionItem>
                </Accordion>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('pre expand multiple accordions via accordion props', () => {
        const tree = renderer
            .create(
                <Accordion accordion={false} activeItems={[0, 2]}>
                    <AccordionItem>Fake Child</AccordionItem>
                    <AccordionItem>Fake Child</AccordionItem>
                    <AccordionItem>Fake Child</AccordionItem>
                </Accordion>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('pre expand accordion via accordion props with custom key', () => {
        const tree = renderer
            .create(
                <Accordion activeItems={['custom']}>
                    <AccordionItem>Fake Child</AccordionItem>
                    <AccordionItem customKey="custom">Fake Child</AccordionItem>
                </Accordion>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('expand accordion via accordion props dynamicly', () => {
        const wrapper = renderer.create(
            <Accordion activeItems={[0]}>
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        wrapper.update(
            <Accordion activeItems={[1]}>
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        expect(wrapper.getInstance().state.activeItems).toEqual([1]);
        expect(wrapper).toMatchSnapshot();
    });

    it('expand multiple accordions via accordion props props dynamicly', () => {
        const wrapper = renderer.create(
            <Accordion accordion={false} activeItems={[0, 2]}>
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        wrapper.update(
            <Accordion accordion={false} activeItems={[1, 2]}>
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        expect(wrapper.getInstance().state.activeItems).toEqual([1, 2]);
        expect(wrapper).toMatchSnapshot();
    });

    it(`expand multiple accordions via accordion props props dynamicly with default
        expanded on accordion items`, () => {
        const wrapper = renderer.create(
            <Accordion accordion={false}>
                <AccordionItem expanded={true}>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        wrapper.update(
            <Accordion accordion={false} activeItems={[1, 2]}>
                <AccordionItem expanded={true}>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        expect(wrapper.getInstance().state.activeItems).toEqual([1, 2]);
        expect(wrapper).toMatchSnapshot();
    });

    it('close accordions via accordion props props dynamicly', () => {
        const wrapper = renderer.create(
            <Accordion activeItems={[1]}>
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        wrapper.update(
            <Accordion activeItems={[]}>
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        expect(wrapper.getInstance().state.activeItems).toEqual([]);
        expect(wrapper).toMatchSnapshot();
    });

    it('different className with the same activeItems prop', () => {
        const wrapper = renderer.create(
            <Accordion activeItems={[1]} className="test-1">
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        wrapper.update(
            <Accordion activeItems={[1]} className="test-2">
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('different className with the same activeItems prop', () => {
        const wrapper = renderer.create(
            <Accordion activeItems={[1]} className="test-1">
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        wrapper.update(
            <Accordion activeItems={[1]} className="test-2">
                <AccordionItem>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('supports controlled component inside accordion', () => {
        class App extends Component {
            constructor(props) {
                super(props);

                this.state = {
                    value: '',
                };
            }

            handleChange = evt => {
                this.setState({
                    value: evt.target.value,
                });
            };

            render() {
                return (
                    <Accordion activeItems={[1]} id="accordion">
                        <AccordionItem>
                            <AccordionItemTitle>
                                Open and try to write something in the input
                            </AccordionItemTitle>
                            <AccordionItemBody>
                                <input
                                    id="controlled-input"
                                    onChange={this.handleChange}
                                    value={this.state.value}
                                />
                            </AccordionItemBody>
                        </AccordionItem>
                    </Accordion>
                );
            }
        }
        const wrapper = renderer.create(<App />);
        const accordion = wrapper.root.findByType(Accordion);
        accordion._fiber.stateNode.handleClick(0);
        console.log(accordion._fiber.stateNode.state);
        expect(accordion._fiber.stateNode.state.activeItems).toEqual([0]);
        wrapper.getInstance().handleChange({ target: { value: 'newValue' } });
        console.log(accordion._fiber.stateNode.state);
        expect(accordion._fiber.stateNode.state.activeItems).toEqual([0]);

        // accordion.getInstance().handleClick(0);
        // expect(accordion.getInstance().state.activeItems).toEqual([0]);

        // expect(accordion.getInstance().state.activeItems).toEqual([0]);
    });
});
