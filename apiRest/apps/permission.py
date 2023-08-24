from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
  
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return request.user.is_staff


#testearr
class IsDoctorOrReadOnly(permissions.BasePermission):
  
    def has_permission(self, request, view):
        
        if request.method in permissions.SAFE_METHODS:
            return True        
        elif request.user.doctorProfile:
            return True
        else:
            return request.user.is_staff

class IsSeminartOrReadOnly(permissions.BasePermission):
    pass