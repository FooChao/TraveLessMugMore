import React from 'react'

const CreditsPage = () => {
  return (
    <div className="container text-3xl mx-auto">
        
        <p className="text-3xl mb-10">This website is made by Foo Chao</p>
        <p className="text-3xl mb-10">Any problems? Report at</p>
        <a className="text-3xl mb-10 underline text-red-500 hover:text-red-700" href='https://github.com/FooChao/Test-Website' target='_blank'>https://github.com/FooChao/Test-Website</a>
        
    </div>
  )
}

export default CreditsPage