import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroEyeSlashSolid, heroEyeSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-general-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIconComponent],
  viewProviders: [provideIcons({ heroEyeSolid, heroEyeSlashSolid })],
  templateUrl: './general-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GeneralInputComponent),
      multi: true
    }
  ]
})
export class GeneralInputComponent implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() type: string = '';
  @Input() autocomplete: string = '';
  @Input() required: boolean = false;
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  isPasswordInput: boolean = false;

  private internalValue: any = '';

  get value(): any {
    return this.internalValue;
  }

  set value(value: any) {
    if (this.internalValue !== value) {
      this.internalValue = value;
      this.onChange(value);
    }
  }

  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(value: any): void {
    this.value = value || ''; // Asegúrate de manejar el caso de `null` o `undefined`
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.value = inputElement.value;
    }
  }

  onBlur(): void {
    this.onTouched();
  }

  togglePasswordVisibility(): void {
    if (this.type === 'password') {
      this.type = 'text';
      this.isPasswordInput = true;
    } else {
      this.type = 'password';
      this.isPasswordInput = false;
    }
  }
}
