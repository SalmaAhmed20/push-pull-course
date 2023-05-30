from django.shortcuts import render, redirect , reverse
from  django.http import HttpResponse
# Create your views here.
from  employees.models import Employee


# employees=  ['Ahmed', 'Mohamed', 'Gehad']
def allemployees(request):
    employees = Employee.get_all_employees()
    return HttpResponse(employees)


def getemployee(request, id):
    employees = Employee.get_all_employees()
    if id in range(len(employees)):
        return HttpResponse(employees[id])
    else:
        return HttpResponse("<h1> employee not found </h1>")

#

def employees_list(request):
    employees = Employee.get_all_employees()
    return render(request,'employees.html',context={"allemployees": employees})



from django.http import HttpResponse, JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def employee_delete(request: HttpRequest, id):
    employee = Employee.objects.get(id=id)
    employee.delete()
    return JsonResponse({'success': True})


def employee_show(request, id):
    employee = Employee.get_employee(id)
    return render(request, 'employee_info.html', context={"employee":employee})

#
from employees.forms import  EmployeeForm
def create_employee(request):
    form = EmployeeForm()
    print("hi")
    if request.method =='GET':
        print("get")
        return render(request, 'create_employee.html', context={"form":form})
    else:
        print(request.POST)
        ## upload image 000> request.FILES
        # print(request.FILES)
        ## use form object to save data
        form = EmployeeForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
        # return HttpResponse("POST request received")
        redirect_url = reverse('employees.index')
        return redirect(redirect_url)
    
def employee_edit(request, id):
    employee = Employee.get_employee(id)
    employee.save()
    if request.method =='GET':
        form = EmployeeForm(instance=employee)
        return render(request, 'edit_employee.html', context={"form":form})
    else:
        form = EmployeeForm(request.POST, request.FILES, instance=employee)
        if form.is_valid():
            form.save()
        return JsonResponse({'success': True})
