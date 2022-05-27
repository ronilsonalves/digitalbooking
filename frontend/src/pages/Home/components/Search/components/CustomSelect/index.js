import Select, { components } from 'react-select';

import { MdLocationPin } from 'react-icons/md';

import styled from './styles.module.scss';

const { Option } = components;

const options = [
  {value: "osasco", label: "Osasco", state: "São Paulo"},
  {value: "carapicuiba", label: "Carapicuíba", state: "São Paulo"},
  {value: "sorocaba", label: "Sorocaba", state: "São Paulo"},
];

const colourStyles = {
  container: (props) => {
  },

  control: (props) => ({
    ...props,           
    border: "0px solid #ffffff",
    borderColor: "#ffffff",
    boxShadow : "none",
    position: "static",
  }), 

  menu: base => ({
    ...base,
    zIndex: 100,
    marginLeft: "-22px",
    marginTop: 5,
    boxShadow: "1px 3px 3px #cccccc"
  }),

  menuList: (styles) => ({
    ...styles,
    background: '#ffffff',
  }),

  option: (styles, {isFocused, isSelected}) => ({
    ...styles,
    background: isFocused
        ? '#FFFBE2'
        : isSelected ? '#ffffff': undefined,
    zIndex: 1,
    color: isFocused
    ? '#263238'
    : isSelected ? '#263238': undefined,
  }),
}

function CustomOption(props) {
  return (
    <Option {...props} className={`${styled.option} d-flex align-items-center mx-auto`}>
      <MdLocationPin size={28} color="#7d8182" className="me-2"/>
      <div>
        <strong className="d-block">{props.data.label}</strong>
        <span className="fs-14">{props.data.state}</span>
      </div>
    </Option>
  )
}

export function CustomSelect() { 
  return (
    <div className="d-flex align-items-center w-100 bg-light rounded position-relative">
      <MdLocationPin size={24} color="#7d8182"/>
      <Select
        className={styled.react_select_container}
        classNamePrefix="react-select"
        placeholder="Local da retirada..."
        options={options}
        components={{ 
          Option: CustomOption, 
          DropdownIndicator:() => null, 
          IndicatorSeparator:() => null 
        }}
        styles={colourStyles}
      />
    </div>
  ) 
}