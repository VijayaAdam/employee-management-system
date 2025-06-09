package com.vijaya.ems.service;

import com.vijaya.ems.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
     public EmployeeDto createNewEmployee(EmployeeDto employeeDto);

     public List<EmployeeDto> getAllEmployees();

     public EmployeeDto getEmployeeById(Long id);

     public EmployeeDto updateEmployeeById(Long id, EmployeeDto employeeDto);

     public void deleteEmployeeById(Long id);
}
