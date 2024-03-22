from django_auth_ldap.backend import LDAPBackend


class CustomLDAPBackend(LDAPBackend):
    def authenticate(self, request, username=None, email=None, password=None, **kwargs):
        username = email if email else username
        user = super().authenticate(request, username, password, **kwargs)
        return user
