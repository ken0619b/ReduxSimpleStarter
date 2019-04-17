import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'components/CommentBox';

let wrapped;

beforeEach(() => {
  wrapped = mount(<CommentBox />);
})

afterEach(() => {
  wrapped.unmount();
})

it('has a text area and a buton', () => {
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(1);
});

describe('the textarea', () => {
  beforeEach(() => {
    wrapped.find('textarea').simulate('change', {
      target: { value: 'new comment'}
    });
    wrapped.update();
  });

  it('has a text area that users can type in', () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
  });

  it('when form is submitted, text area gets empty', () => {
    wrapped.find('form').simulate('submit');
    wrapped.update();
    expect(wrapped.find('textarea').prop('value')).toEqual('');
  });
});

