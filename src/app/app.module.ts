import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from './app.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TbMatTableComponent } from './components/tb-mat-table/tb-mat-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BaseService } from './services/base.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar.component';
import { LocalStorageService } from './services/localstorage.service';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TbHeaderComponent } from './components/tb-header/tb-header.component';
import { MatIconModule } from '@angular/material/icon';
import { TbDateSliderComponent } from './components/tb-date-slider/tb-date-slider.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    HttpClientModule,
    MatCardModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [
    AppComponent,
    TbHeaderComponent,
    TbMatTableComponent,
    FilterSidebarComponent,
    TbDateSliderComponent,
  ],
  bootstrap: [AppComponent],
  providers: [BaseService, LocalStorageService],
})
export class AppModule {}
