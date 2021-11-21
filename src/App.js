import React from "react";
import { reqList, reqAdd, reqAssignReward, reqSearchMember, reqDelete } from './api/index.js'

function App() {
  let [memberList, setMemberList] = React.useState([])
  let [rewardList, setRewardList] = React.useState([])
  let [addType, setAddType] = React.useState('member')
  let [addName, setAddName] = React.useState('')
  let [addMsg, setAddMsg] = React.useState('')
  let [assignName, setAssignName] = React.useState('kevin')
  let [assignReward, setAssignReward] = React.useState('empty')
  let [assignMsg, setAssignMsg] = React.useState('')
  let [searchName, setSearchName] = React.useState('')
  let [searchResult, setSearchResult] = React.useState('')
  let [delType, setDelType] = React.useState('member')
  let [delName, setDelName] = React.useState('')
  let [delResult, setDelResult] = React.useState('')

  React.useEffect(() => {
    //init member and reward list
    getList('member')
    getList('reward')
  }, [])
  
  //init list based on different types(reward or member), save them into state
  const getList = async (listType) => {
    const result = await reqList(listType)
    if (listType === 'member') setMemberList(result.data.data)
    else setRewardList(result.data.data)
  }
  //This function is used to save info into state based on different data type
  const saveFormData = (dataType, event) => {
    if (dataType === "addType") setAddType(event.target.value)
    else if (dataType === "addName") setAddName(event.target.value)
    else if (dataType === "assignName") setAssignName(event.target.value)
    else if (dataType === "assignReward") setAssignReward(event.target.value)
    else if (dataType === "searchName") setSearchName(event.target.value)
    else if (dataType === 'delType') setDelType(event.target.value)
    else setDelName(event.target.value)
  }

  //handle add member or reward
  const handleAddSubmit = async (event) => {
    event.preventDefault()

    const result = await reqAdd(addType, addName)
    if (result.data.status === -1) setAddMsg(result.data.msg)
    else {
      setAddMsg(`${addType} is successfully added!`)
      getList(addType)
    }
  }

  //handle assign reward
  const handleAssignSubmit = async (event) => {
    event.preventDefault()
    const result = await reqAssignReward(assignName, assignReward)
    if (result.data.status === -1) setAssignMsg(result.data.msg)
    else setAssignMsg(`Reward is successfully assigned!`)

  }

  //handle search member info
  const handleSearchSubmit = async (event) => {
    event.preventDefault()
    const result = await reqSearchMember(searchName)
    if (result.data.status === -1) setSearchResult(result.data.msg)
    else setSearchResult(`Member name: ${result.data.data.memberName} ==== Reward name: ${result.data.data.memberReward}`)
  }

  //handle delete member or reward
  const handleDeleteSubmit = async (event) => {
    event.preventDefault()
    if (window.confirm('Do you really want to delete?')) {
      const result = await reqDelete(delType, delName)
      console.log(result)
      if (result.data.status === -1) setDelResult(result.data.msg)
      else {
        setDelResult(`Congratulations! ${delName} has already been deleted! `)
        getList(delType)
      }
    }else return

  }

  return (
    <div>
      <h1>Welcome to my Code Test!</h1>
      <hr />
      <h2>Add Member & Reward</h2>
      <form onSubmit={handleAddSubmit}>
        Select Add Type:&nbsp;
        <select onChange={event => saveFormData('addType', event)} style={{ 'width': '100px' }}>
          <option value="member">Member</option>
          <option value="reward">Reward</option>
        </select><br /><br />
        <input name="keyword" onChange={event => saveFormData('addName', event)} placeholder="Input name" style={{ 'width': '100px' }} />
        &nbsp;&nbsp;<input type="submit" value="Add" />
      </form>
      <br />
      <p>{addMsg}</p>

      <hr />
      <h2>Assign Reward</h2>
      <form onSubmit={handleAssignSubmit}>
        Member Name:&nbsp;
        <select onChange={event => saveFormData('assignName', event)} style={{ 'width': '100px' }}>
          {
            memberList.map((member, index) => {
              return <option key={index} value={member.memberName}>{member.memberName}</option>
            })
          }
        </select> &nbsp;
        Reward Name:&nbsp;
        <select onChange={event => saveFormData('assignReward', event)} style={{ 'width': '100px' }}>
          <option value="empty">No reward</option>
          {
            rewardList.map((reward, index) => {
              return <option key={index} value={reward.rewardName}>{reward.rewardName}</option>
            })
          }
        </select>&nbsp;&nbsp;
        <input type="submit" value="Assign" />
      </form>
      <p>{assignMsg}</p>

      <hr />
      <h2>Search Member</h2>
      <form onSubmit={handleSearchSubmit}>
        <input placeholder="Input member name" onChange={event => saveFormData('searchName', event)} />
        &nbsp;&nbsp;<input type="submit" value="Search" />
      </form>
      <p>{searchResult}</p>

      <hr />
      <h2>Delete Member & Reward</h2>
      <form onSubmit={handleDeleteSubmit}>
        Select Delete Type:&nbsp;
        <select onChange={event => saveFormData('delType', event)} style={{ 'width': '100px' }}>
          <option value="member">Member</option>
          <option value="reward">Reward</option>
        </select><br /><br />
        <input name="keyword" onChange={event => saveFormData('delName', event)} placeholder="Input name" style={{ 'width': '100px' }} />
        &nbsp;&nbsp;<input type="submit" value="Delete" />
      </form>
      <p>{delResult}</p>
      <hr />
    </div>
  );
}

export default App;
