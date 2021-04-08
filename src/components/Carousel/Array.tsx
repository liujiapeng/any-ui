import React from 'react'

interface IProps {
  onClick: () => void
}

export const LeftArray: React.FC<IProps> = ({ onClick }) => (
  <div className="carousel-array-wrap">
    <div onClick={onClick} className="carousel-array left" />
  </div>
)

export const RightArray: React.FC<IProps> = ({ onClick }) => (
  <div className="carousel-array-wrap">
    <div onClick={onClick} className="carousel-array right" />
  </div>
)
