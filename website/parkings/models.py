from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone
from users.models import CustomUser


class ParkingSpot(models.Model):
    name = models.CharField(max_length=50, unique=True, blank=False, null=False)
    owners = models.ManyToManyField(CustomUser, blank=True, null=True)

    class Meta:
        verbose_name = "Parking spot"
        verbose_name_plural = "Parking spots"

    def __str__(self):
        owners_list = ', '.join(str(owner) for owner in self.owners.all())
        return f'Parking spot "{self.name}" - {owners_list if owners_list else "Empty"}'

    def clean(self, *args, **kwargs):
        super().clean(*args, **kwargs)
        if self.pk:
            other_parkings = ParkingSpot.objects.exclude(pk=self.pk).filter(name=self.name)
            if other_parkings.exists():
                raise ValidationError("Miejsce o tym numerze już istnieje")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)


class ParkingBooking(models.Model):
    spot = models.ForeignKey(ParkingSpot, on_delete=models.CASCADE, blank=False, null=False)
    tenant = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateField(blank=False, null=False)

    class Meta:
        verbose_name = "Parking booking"
        verbose_name_plural = "Parking bookings"

    def __str__(self):
        return f'Parking booking for parking spot "{self.spot.name} - {self.tenant}'

    def clean(self):
        bookings = ParkingBooking.objects.filter(spot=self.spot, date=self.date)
        user_bookings = ParkingBooking.objects.filter(date=self.date, tenant=self.tenant)

        if user_bookings.count() > 0:
            if self.tenant is None:
                raise ValidationError("There is already a reservation for this place for this day")
            elif self.tenant is not None:
                raise ValidationError("You have already booked a parking spot for this day")

        if self.pk:
            for booking in bookings:
                if booking.tenant is not None:
                    if self.tenant is None:
                        return
                    else:
                        raise ValidationError("This place is already booked for this day")
                elif booking.tenant is None:
                    return
        else:
            if bookings.exists():
                raise ValidationError("There is already a reservation for this place for this day")
            if ParkingBooking.objects.filter(spot=self.spot, date=self.date, tenant__isnull=False).exists():
                raise ValidationError("This place is already booked for this day")
            if self.date <= timezone.now().date():
                raise ValidationError("The reservation can be made for the next day at the earliest")
