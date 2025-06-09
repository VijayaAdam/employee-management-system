package com.vijaya.ems.service;


import com.vijaya.ems.dto.EmployeeDto;
import com.vijaya.ems.entity.Employee;
import com.vijaya.ems.exception.EmployeeResourceNotFoundException;
import com.vijaya.ems.mapper.EmployeeMapper;
import com.vijaya.ems.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private EmployeeRepository employeeRepository;


    @Override
    public EmployeeDto createNewEmployee(EmployeeDto employeeDto){
        Employee newEmployee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(newEmployee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> allEmployees = employeeRepository.findAll();
        return allEmployees.stream().map((e) -> EmployeeMapper.mapToEmployeeDto(e)).collect(Collectors.toList());
    }

    @Override
    public  EmployeeDto getEmployeeById(Long id){
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new EmployeeResourceNotFoundException("Employee Id requested doesn't exist..."));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public EmployeeDto updateEmployeeById(Long id, EmployeeDto employeeDto){
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new EmployeeResourceNotFoundException("Employee Id requested doesn't exist ..."));
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(employee);
}

    @Override
    public void deleteEmployeeById(Long id){
        Employee employee = employeeRepository.findById(id).orElseThrow(()-> new EmployeeResourceNotFoundException("No ID"));
        employeeRepository.deleteById(id);
    }
}
