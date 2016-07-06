import React from 'react'
import { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'
import Dashboard from '../../app/public/jsx/views/Dash.jsx'
// require('react')
// var expect = require('chai')
// var shallow, mount, render = require('enzyme')
// var Dashboard = require('../../app/public/jsx/views/Dash.jsx')

describe("Dashboard", function() {
  it("contains the Metrics component", function() {
    expect(shallow(<Dashboard />).contains(<Metrics />)).to.equal(true);
  });

  it("contains the Nav component", function() {
    expect(shallow(<Dashboard />).contains(<Nav />)).to.equal(true);
  });

  it('should render children when passed in', () => {
    const wrapper = shallow(
      <Dashboard>
        <div className="child" />
      </Dashboard>
    );
    expect(wrapper.contains(<div className="child" />)).to.equal(true);
  });

});