import React from 'react'

const CreditsPage = () => {
  return (
    <div className="container text-3xl mx-auto">
        
        <p className="text-3xl mb-10">This website is made by Foo Chao</p>
        <p className="text-3xl mb-10">Any problems with frontend? Report at</p>
        <a className="text-3xl mb-10 underline text-red-500 hover:text-red-700" href='https://github.com/FooChao/TraveLessMugMore' target='_blank'>https://github.com/FooChao/TraveLessMugMore</a>
        <p className="text-3xl mb-10">APIs are fetched from NUS Mod API.(not by me if you see any wrong data due to wrong info from API tell nus mod team don't tell me :()) </p>
               
    </div>
  )
}

export default CreditsPage