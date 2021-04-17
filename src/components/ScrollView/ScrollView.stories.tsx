import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import ScrollView, { IProps } from './ScrollView'
import '../../styles/index.scss'

export default {
  title: 'ScrollView',
  component: ScrollView,
} as Meta

const getData = (): Promise<string> =>
  new Promise((resolve) => setTimeout(() => resolve('request data!'), 2000))

const Template: Story<IProps> = (args) => {
  const [requestData, setRequestData] = useState<string>('')
  const fetchData = () =>
    new Promise<void>((resolve) => {
      getData().then((data) => {
        setRequestData(data)
        // do some message feedback to user and resolve
        resolve()
      })
    })

  return (
    <div>
      <ScrollView {...args} onRefreshCb={fetchData}>
        <h1>{requestData}</h1>
        <div id="p0">
          <h1>title 1</h1>
          The Redux Toolkit package is intended to be the standard way to write
          Redux logic. It was originally created to help address three common
          concerns about Redux: We cant solve every use case, but in the spirit
          of create-react-app and apollo-boost, we can try to provide some tools
          that abstract over the setup process and handle the most common use
          cases, as well as include some useful utilities that will let the user
          simplify their application code. These tools should be beneficial to
          all Redux users. Whether your a brand new Redux user setting up your
          first project, or an experienced user who wants to simplify an
          existing application, Redux Toolkit can help you make your Redux code
          better.
        </div>

        <div id="p1">
          <h1>title 2</h1>
          Redux Toolkit is available as a package on NPM for use with a module
          bundler or in a Node application: It is also available as a
          precompiled UMD package that defines a window.RTK global variable. The
          UMD package can be used as a tag directly. configureStore(): wraps
          createStore to provide simplified configuration options and good
          defaults. It can automatically combine your slice reducers, adds
          whatever Redux middleware you supply, includes redux-thunk by default,
          and enables use of the Redux DevTools Extension. createReducer(): that
          lets you supply a lookup table of action types to case reducer
          functions, rather than writing switch statements. In addition, it
          automatically uses the immer library to let you write simpler
          immutable updates with normal mutative code, like
          state.todos[3].completed = true. createAction(): generates an action
          creator function for the given action type string. The function itself
          has toString() defined, so that it can be used in place of the type
          constant. createSlice(): accepts an object of reducer functions, a
          slice name, and an initial state value, and automatically generates a
          slice reducer with corresponding action creators and action types.
        </div>

        <div id="p2">
          <h1>title 3</h1>
          The #redux channel of the Reactiflux Discord community is our official
          resource for all questions related to learning and using Redux.
          Reactiflux is a great place to hang out, ask questions, and learn -
          come join us!
        </div>
      </ScrollView>
    </div>
  )
}

export const Primary = Template.bind({})

Primary.args = {
  pullRefreshRender: '加载中',
}
